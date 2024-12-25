import Image from "next/image";
import logo from "../../public/logo.svg";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center justify-center sm:justify-start">
      <Image
        width={39}
        height={37}
        src={logo}
        alt="logo image"
        className="w-10 h-auto sm:w-12" // Responsive size adjustments
      />
    </Link>
  );
}

export default Logo;
