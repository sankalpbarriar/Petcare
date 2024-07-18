import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
type actionTypeProps = {
    actionType: "add" | "edit" | "checkout";
    onClick?: () => void;
    children?: React.ReactNode;
}

export default function PetButton({ actionType, onClick, children }: actionTypeProps) {

    if (actionType === "add") {
        return <Button size="icon" className="rounded-full"><PlusIcon /></Button>
    }

    if (actionType == "edit") {
        return <Button className="rounded-full" variant="secondary">{children}</Button>
    }
    if (actionType == "checkout") {
        return <Button className="rounded-full" variant="secondary" onClick={onClick}>{children}</Button>
    }
}