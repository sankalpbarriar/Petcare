import { logIn } from "@/actions/actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type AuthFormProps = {
    type: "login" | "signup";
}
export default function AuthForm({
    type
}: AuthFormProps) {
    return (
        <form action={logIn}>
            <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" />
            </div>
            <div className="mb-4 mt-2 space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" />
            </div>
            <Button className="mt-4">{
                type === "login" ? "Login" : "Sign Up"}</Button>
        </form>
    )
}