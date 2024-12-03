'use client';
import { logOut } from '@/actions/actions';
import { Button } from './ui/button'

function SignOutBtn() {
    return (
        <Button onClick={async() => await logOut()}>Sign Out</Button>
    )
}

export default SignOutBtn