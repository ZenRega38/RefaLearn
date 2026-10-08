import { NextRequest, NextResponse } from "next/server";
import { errorMessage, readJson, requireAdminUser } from "@/lib/api-auth";
import {
    getUserEmail,
    sendInvoiceStatusEmail,
    sendMaterialOrderStatusEmail,
    sendPrepaymentStatusEmail,
} from "@/lib/email";
import { monthLabel } from "@/lib/format";

/**
 * Generic "notify a student" endpoint, called by admin pages right after
 * they confirm or reject a payment. Session accept/decline and reschedule
 * decisions email from their own routes.
 *
 * Body: { type: "invoice_status" | "material_order_status" | "prepayment_status"; recordId: string }
 */
export async function POST(request: NextRequest) {
    const auth = await requireAdminUser();
    if (!auth.ok) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }
    const { supabase } = auth;

    const body = await readJson<{ type?: string; recordId?: string }>(request);
    const type = body?.type;
    const recordId = body?.recordId;
    if (!type || !recordId) {
        return NextResponse.json({ error: "type and recordId are required" }, { status: 400 });
    }

    const nameOf = async (studentId: string) => {
        const { data } = await supabase.from("profiles").select("full_name").eq("id", studentId).single();
        return data?.full_name || "Siswa";
    };

    try {
        switch (type) {
            case "invoice_status": {
                const { data: invoice } = await supabase
                    .from("invoices")
                    .select("student_id, period_month, period_year, status")
                    .eq("id", recordId)
                    .single();
                if (!invoice) throw new Error("Invoice not found");
                if (invoice.status !== "confirmed" && invoice.status !== "rejected") break;

                const email = await getUserEmail(invoice.student_id);
                if (email) {
                    await sendInvoiceStatusEmail(email, {
                        studentName: await nameOf(invoice.student_id),
                        monthLabel: monthLabel(invoice.period_month, invoice.period_year),
                        status: invoice.status,
                    });
                }
                break;
            }

            case "material_order_status": {
                const { data: order } = await supabase
                    .from("material_orders")
                    .select("student_id, status")
                    .eq("id", recordId)
                    .single();
                if (!order) throw new Error("Order not found");
                if (order.status !== "confirmed" && order.status !== "rejected") break;

                const email = await getUserEmail(order.student_id);
                if (email) {
                    await sendMaterialOrderStatusEmail(email, {
                        studentName: await nameOf(order.student_id),
                        status: order.status,
                    });
                }
                break;
            }

            case "prepayment_status": {
                const { data: item } = await supabase
                    .from("prepayments")
                    .select("student_id, status")
                    .eq("id", recordId)
                    .single();
                if (!item) throw new Error("Prepayment not found");
                if (item.status !== "confirmed" && item.status !== "rejected") break;

                const email = await getUserEmail(item.student_id);
                if (email) {
                    await sendPrepaymentStatusEmail(email, {
                        studentName: await nameOf(item.student_id),
                        status: item.status,
                    });
                }
                break;
            }

            default:
                return NextResponse.json({ error: `Unknown notification type: ${type}` }, { status: 400 });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("[api/notify] failed:", err);
        return NextResponse.json({ error: errorMessage(err, "Failed to send notification") }, { status: 500 });
    }
}
