"use client"

import React from "react";
import {
    Sheet,
    SheetContent,
  } from "@/components/ui/sheet"
import Sidebar from "./sidebar";
import { useSidebarStore } from "@/stores/sidebar-store";
 
interface MobileSidebarProps{
    isProPlan?: boolean;
    userLimitCount: number;
}

const MobileSidebar:React.FC<MobileSidebarProps>=({isProPlan, userLimitCount}) => {
    const {isOpen} = useSidebarStore()
    return(
            <Sheet open={isOpen}>
                <SheetContent 
                className="w-screen border-none bg-black p-0 pt-8 "
                side="left">
                    <Sidebar 
                    userLimitCount={userLimitCount} 
                    isProPlan={isProPlan}/>
                    
                </SheetContent>
            </Sheet>

    )
}

export default MobileSidebar