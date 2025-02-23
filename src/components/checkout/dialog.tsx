"use client"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { DialogHeader } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { StepUser } from "@/components/checkout/step-user"
import { StepAddress } from "./step-address"
import { StepFinish } from "./step-finish"
import { CheckoutSteps } from "@/types/checkout-steps"

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}


export const CheckoutDialog = ({open, onOpenChange}: Props) => {
    const [step, setStep] = useState<CheckoutSteps>("user");

    let progressPCT = 0;
    switch(step) {
        case 'user':
            progressPCT = 35;
            break;
        case 'address':
            progressPCT = 65;
            break;
        case 'finish':
            progressPCT = 100;
            break;
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {step === 'user' && 
                            "Dados Pessoais"
                        }
                        {step === "address" &&
                            "Endereço de entrega"
                        }
                        {step === 'finish' &&
                            "Envio para o WhatsApp"
                        }
                    </DialogTitle>
                </DialogHeader>

                <Progress value={progressPCT} />

                <div className="flex flex-col gap-3">
                    {step === 'user' && <StepUser setStep={setStep} />}
                    {step === 'address' && <StepAddress setStep={setStep} />}
                    {step === 'finish' && <StepFinish />}
                </div>
                
            </DialogContent>
        </Dialog>
    )
}