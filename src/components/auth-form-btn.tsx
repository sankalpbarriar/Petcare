'use client'
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type AuthFormBtnProps = {
    type: "logIn" | "signUp";
}

export default function AuthFormBtn({ type }: AuthFormBtnProps) {
    const { pending } = useFormStatus();
    return (
        <Button disabled={pending}
            className="mt-4">{
                type === "logIn" ? "Login" : "Sign Up"}</Button>
    )
}