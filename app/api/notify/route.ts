import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/api-auth";
import {
    getUserEmail,
    sendSessionDeclinedEmail,
    sendInvoiceStatusEmail,
    sendMaterialOrderStatusEmail,
} from "@/lib/email";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

/**
 * Generic "notify a student" endpoint, called by admin pages right after
 * they update a record's status via the browser Supabase client. Kept as
 * one endpoint (dispatching on `type`) rather than one route per event —
 * all of them share the same admin-check + "look up student email" shape.
 *
 * Body: { type: string; recordId: string }
 */
export async function POST(request: NextRequest) {
    const auth = await requireAdminUser();
    if (!auth.ok) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }
    const { supabase } = auth;

    let body: { type?: string; recordId?: string };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { type, recordId } = body;
    if (!type || !recordId) {
        return NextResponse.json({ error: "type and recordId are required" }, { status: 400 });
    }

    try {
        switch (type) {
            case "session_declined": {
                const { data: session } = await supabase
                    .from("sessions")
                    .select("student_id, date, start_time")
                    .eq("id", recordId)
                    .single();
                if (!session) throw new Error("Session not found");

                const { data: profile } = await supabase
                    .from("profiles")
                    .select("full_name")
                    .eq("id", session.student_id)
                    .single();

                const email = await getUserEmail(session.student_id);
                if (email) {
                    await sendSessionDeclinedEmail(email, {
                        studentName: profile?.full_name || "Siswa",
                        date: format(parseISO(session.date), "dd MMMM yyyy", { locale: id }),
                        time: (session.start_time as string)?.slice(0, 5) || "",
                    });
                }
                break;
            }

            case "invoice_status": {
                const { data: invoice } = await supabase
                    .from("invoices")
                    .select("student_id, period_month, period_year, status")
                    .eq("id", recordId)
                    .single();
                if (!invoice) throw new Error("Invoice not found");
                if (invoice.status !== "confirmed" && invoice.status !== "rejected") break;

                const { data: profile } = await supabase
                    .from("profiles")
                    .select("full_name")
                    .eq("id", invoice.student_id)
                    .single();

                const email = await getUserEmail(invoice.student_id);
                if (email) {
                    const monthLabel = format(
                        new Date(invoice.period_year, invoice.period_month - 1, 1),
                        "MMMM yyyy",
                        { locale: id }
                    );
                    await sendInvoiceStatusEmail(email, {
                        studentName: profile?.full_name || "Siswa",
                        monthLabel,
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

                const { data: profile } = await supabase
                    .from("profiles")
                    .select("full_name")
                    .eq("id", order.student_id)
                    .single();

                const email = await getUserEmail(order.student_id);
                if (email) {
                    await sendMaterialOrderStatusEmail(email, {
                        studentName: profile?.full_name || "Siswa",
                        status: order.status,
                    });
                }
                break;
            }

            default:
                return NextResponse.json({ error: `Unknown notification type: ${type}` }, { status: 400 });
        }

        return NextResponse.json({ ok: true });
    } catch (err: any) {
        console.error("[api/notify] failed:", err);
        return NextResponse.json({ error: err.message || "Failed to send notification" }, { status: 500 });
    }
}