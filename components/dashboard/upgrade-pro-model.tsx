"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
  } from "@/components/ui/dialog"
import SubscriptionButton from "../subscription-btn";
import { useProState } from "@/stores/pro-store";

interface  UpgradeProModelProps{
    isProPlan?:boolean;
}
  

const UpgradeProModel: React.FC<UpgradeProModelProps>=({isProPlan}) => {
    const {isOpen, handleCloseProModal}=useProState()
    return(
        <div>
            <Dialog open={isOpen}>
                <DialogContent
                onClose={handleCloseProModal}
                showOverlay
                >
                    <SubscriptionButton isPro={isProPlan}/>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default UpgradeProModel