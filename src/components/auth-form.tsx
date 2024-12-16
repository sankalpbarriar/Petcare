'use client'
import { logIn, signUp } from "@/actions/actions";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import AuthFormBtn from "./auth-form-btn";
import { useFormState } from "react-dom";

type AuthFormProps = {
    type: "logIn" | "signUp";
}

export default function AuthForm({ type }: AuthFormProps) {
    const [signUpError, dispatchSignUp] = useFormState(signUp, undefined)  //special prop to handle the error message
    const [logInError, dispatchlogIn] = useFormState(logIn, undefined)
    return (
        //benifit of using the action attribute instead of the of onSubmit is more performance enhancement it runs even when the js does not loads
        <form action={type === "logIn" ? dispatchlogIn : dispatchSignUp}>
            <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" required maxLength={100} />
            </div>
            <div className="mb-4 mt-2 space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" required maxLength={90} />
            </div>
            <AuthFormBtn type={type} />

            {signUpError && (<p className="text-red-500 text-sm mt-2">{signUpError.message}</p>)}
            {logInError && (<p className="text-red-500 text-sm mt-2">{logInError.message}</p>)}
        </form>
    )
}