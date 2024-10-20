'use client'
import { usePetContext } from "@/lib/hooks";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { addPet } from "@/actions/actions";
import PetFormBtn from "./pet-form-btn";
import { toast } from "sonner";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
}

export default function PetForm({ actionType, onFormSubmission }: PetFormProps) {
  const { selectedPet } = usePetContext();
  
  return (
    <form 
    action={async (formData) => {
      const error = await addPet(formData);
      if(error){
        toast.warning(error.message);
        return;
      }
      onFormSubmission();
    }} 
    className="flex flex-col">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" name="name" required defaultValue={
            actionType === 'edit' ? selectedPet?.name : ""
          } />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner name</Label>
          <Input id="ownerName" type="text" name="ownerName" required defaultValue={
            actionType === "edit" ? selectedPet?.ownerName : ""
          } />
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input id="imageUrl" type="text" name="imageUrl" defaultValue={
            actionType === "edit" ? selectedPet?.imageUrl : ""
          } />
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input type="number" id="age" name="age" required defaultValue={
            actionType === 'edit' ? selectedPet?.age : ""
          } />
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" rows={3} name="notes" required defaultValue={
            actionType === 'edit' ? selectedPet?.notes : ""
          } />
        </div>
      </div>

      <PetFormBtn actionType={actionType}/>

    </form>
  )
}