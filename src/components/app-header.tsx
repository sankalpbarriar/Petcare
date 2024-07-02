
'use client'
import Link from 'next/link'
import Logo from './logo'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const routes = [
    {
        label: 'Dashboard',
        path: "/app/dashboard",
    },
    {
        label: 'Account',
        path: "/app/account",
    },

]

function AppHeader() {
    const activePathname = usePathname();
    console.log(activePathname)
    return (
        <header className='flex justify-between items-center border-b border-white/20 py-2'>
            <Logo />

            <nav>
                <ul className='flex text-xs gap-2'>
                    {
                        routes.map(route => (
                            <li key={route.path}>
                                <Link className={cn('text-white/70 rounded-sm px-2 py-1 hover:text-white focus:text-white transition', {
                                    'bg-black/10 text-white': route.path === activePathname,
                                })} href={route.path}>{route.label}</Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader