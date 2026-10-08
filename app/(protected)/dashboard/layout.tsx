import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { PhoneReminder } from "@/components/dashboard/PhoneReminder";

// Same reasoning as app/admin/layout.tsx — this is always a specific
// student's own data, never a cacheable static page.
export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <DashboardTabs />
            <PhoneReminder />
            {children}
        </div>
    );
}