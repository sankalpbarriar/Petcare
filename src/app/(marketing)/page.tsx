import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import marketing from '../../../public/marketing.png'

export default function Home() {
  return (
    <main className="bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10">
      <Image 
       src={marketing}
        alt="preview image"
        width={519}
        height={472}
      />
      <div>
        <Logo />
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">Manage your <span className="font-extrabold">pet daycare</span> with ease</h1>
        <p className="text-2xl font-medium max-w-[600px]">Use Petcare to easily keep track if pets under your care.
          Get lifetime access for $200 </p>
          <div className="mt-8 space-x-3">
            <Button asChild type="submit" className="rounded-full"><Link href={'/sign-up'}>
            Get started</Link></Button>
            <Button asChild variant={"secondary"} className="rounded-full"><Link href={'/login'}>Login</Link></Button>
          </div>
      </div>
    </main>
  );
}
