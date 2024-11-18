'use client'

import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import PetForm from "./pet-form";
import { useState } from "react";
import { flushSync } from "react-dom";
type PetButtonProps = {
    actionType: "add" | "edit" | "checkout";
    disabled?:boolean;
    onClick?: () => void;
    children?: React.ReactNode;
}

export default function PetButton({ actionType,disabled, onClick, children }: PetButtonProps) {
    const[isFormOpen,setIsFormOpen] = useState(false);

    if (actionType == "checkout") {
        return <Button className="rounded-full" disabled={disabled} variant="secondary" onClick={onClick}>{children}</Button>
    }

    return (
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild >
                {
                    actionType === "add" ? (
                        <Button
                            size="icon" className="rounded-full"><PlusIcon />
                        </Button>
                    ) : (
                        <Button className="rounded-full" variant="secondary">{children}</Button>
                    )
                }

            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {actionType === "add" ? 'Add a type':'Edit Pet'}
                    </DialogTitle>
                </DialogHeader>
                <PetForm actionType={actionType}
                 onFormSubmission={()=>{
                    flushSync(()=>{
                        setIsFormOpen(false);
                    })
                 }}/>
                <DialogFooter></DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


