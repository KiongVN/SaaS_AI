'use client'
import { cn } from "@/lib/utils"
import Logo from "./logo"
import { Button } from "./ui/button"
import { useSidebarStore } from "@/stores/sidebar-store"
import { Menu } from "lucide-react"

const Topbar = () => {
    const {handleOpenOrClose} = useSidebarStore()
    return (
        <div className={cn(
            "flex items-center p-4 justify-between sticky top-0",
            "lg:hidden",  
        )}>
            <Logo/>
            <Button
            variant="ghost"
            size="icon"
            onClick={handleOpenOrClose}
            >
                <Menu/>
            </Button>
        </div>
    )
}

export default Topbar