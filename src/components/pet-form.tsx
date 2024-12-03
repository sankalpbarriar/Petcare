'use client'
import { usePetContext } from "@/lib/hooks";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import PetFormBtn from "./pet-form-btn";
import { useForm, get } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { petFormSchema, TPetForm } from "@/lib/validations";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
}

// type TPetForm = {
//   name: string;
//   ownerName: string;
//   imageUrl: string;
//   age: number;
//   notes: string;
// }


export default function PetForm({ actionType, onFormSubmission }: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const {
    register,
    trigger,
    getValues,  //it will give the petData including the correct type
    formState: { errors },
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema),
    defaultValues:
      actionType == "edit"
        ? {
          name: selectedPet?.name,
          ownerName: selectedPet?.ownerName,
          imageUrl: selectedPet?.imageUrl,
          age: selectedPet?.age,
          notes: selectedPet?.notes,
        }
        : undefined,
  });

  return (
    <form
      action={async () => {
        const result = await trigger();  //triggering the validation
        if (!result) return;

        onFormSubmission();

        const petData = getValues();  //getting actual values from the form
        if (actionType === 'add') {
          await handleAddPet(petData);
        }
        else if (actionType === 'edit') {
          await handleEditPet(selectedPet!.id, petData);
        }

      }}
      className="flex flex-col">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register('name')}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner name</Label>
          <Input id="ownerName"
            {...register('ownerName')} />
          {errors.ownerName && <p className="text-red-500">{errors.ownerName.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input
            id="imageUrl"
            {...register('imageUrl')}
          />
          {errors.imageUrl && <p className="text-red-500">{errors.imageUrl.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age"
            {...register('age')} />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes"
            {...register('notes')} />
          {errors.notes && <p className="text-red-500">{errors.notes.message}</p>}
        </div>
      </div>

      <PetFormBtn actionType={actionType} />

    </form>
  )
}