'use client';
import { logOut } from '@/actions/actions';
import { Button } from './ui/button'
import { useTransition } from 'react';

function SignOutBtn() {
    const [isPending, startTransition] = useTransition();
    return (
        <Button
            disabled={isPending}
            onClick={async () => {
                startTransition(async () => {
                    await logOut();
                })
            }}>
            Sign out

        </Button>
    )
}

export default SignOutBtn