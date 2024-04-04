import Topbar from "@/components/tobar"

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div>
      <header><Topbar/></header>
      {children}
    </div>
    
  )
}
export default DashboardLayout