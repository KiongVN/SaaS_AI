"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast"


interface SubBtnProps{
    className?:string;
    isPro?:boolean;
}

const SubscriptionButton: React.FC<SubBtnProps> = ({className,isPro}) => {
    const [loading, setLoading]=useState(false);
    const { toast } = useToast()
    const handleSubcribe= async () => {
        //to do something
        try {
            setLoading(true)
            const {data}= await axios.get("/api/stripe");
            //todo something after get data
        } catch (error) {
            toast({
                variant: "destructive",
                description: "somthing went wrong. Plesea try again",
              })
        }
        finally{
            setLoading(false)
        }
    } 

    return (
        <div className={className}> 
        <Button
        variant="outline"
        size="lg"
        disabled={loading}
        onClick={handleSubcribe}
        className={cn(
            "text-white w-full font-semibold border-none gradient-btn",
            "hover: text-white"
        )}
        >
            <span className="">{isPro?"Manage Subscription":"Upgrade to Pro"}</span>
            <Sparkle/>
        </Button>
        </div>
    )
}

export default SubscriptionButton