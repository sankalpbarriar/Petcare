import Image from 'next/image'
import logo from '../../public/logo.svg'
import Link from 'next/link'

function Logo() {
    return <Link href='/'>
        <Image
            width={39}
            height={37}
            src={logo}
            alt='logo iamge' />
    </Link>
}

export default Logo