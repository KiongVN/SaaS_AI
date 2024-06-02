import { UpgradeProModel } from "@/components/dashboard"
import { MobileSidebar, Sidebar } from "@/components/sidebar"
import Topbar from "@/components/topbar"
import { cn } from "@/lib/utils"

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const isProPlan = false;
  const userLimitCount = 3;
  return (
    <div>
      <header><Topbar/></header>
      <main className={cn(
        "lg:bg-gray-950 lg:overflow-hidden lg:pl-80 lg:pr-7 lg:py-7 [&:has([is-navbar-minimal])]:lg:pl-20 "
      )}>
        <Sidebar 
        userLimitCount={userLimitCount}
        isProPlan={isProPlan}
        className={cn(
          "fixed left-0 z-20 w-80 [&:has([is-navbar-minimal])]:w-fit hidden",
          "lg:block"
        )}
        />
        <MobileSidebar 
        isProPlan={isProPlan}
        userLimitCount={userLimitCount}
        />
        <UpgradeProModel
        isProPlan={isProPlan}
        />
        <div className={cn(
          "bg-background h-[calc(100vh-56px)]",
          "lg:rounded-3xl lg:p-7"
        )}>
          {children}
        </div>
      </main>
    </div>
    
  )
}
export default DashboardLayout