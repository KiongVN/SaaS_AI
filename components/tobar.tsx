import { cn } from "@/lib/utils"

const Topbar = () => {
    return (
        <div className={cn(
            "flex items-center p-4 justify-between sticky top-0",
            "lg:hidden",  
        )}>
            Topbar
        </div>
    )
}

export default Topbar