import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import marketing from '../../../public/marketing.png'

export default function Home() {
  return (
    
      <main className="bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row items-center justify-center px-6 py-10 gap-10">
        <div className="flex justify-center w-full xl:w-1/2">
          <Image
            src={marketing}
            alt="preview image"
            width={519}
            height={472}
            className="w-full max-w-sm xl:max-w-md object-contain"
          />
        </div>
        <div className="text-center xl:text-left w-full xl:w-1/2">
          <Logo />
          <h1 className="text-4xl sm:text-5xl font-semibold my-6 max-w-[500px] mx-auto xl:mx-0">
            Manage your <span className="font-extrabold">pet daycare</span> with ease
          </h1>
          <p className="text-lg sm:text-2xl font-medium max-w-[600px] mx-auto xl:mx-0">
            Use Petcare to easily keep track of pets under your care. Get lifetime access for $200.
          </p>
          <div className="mt-8 space-y-3 sm:space-y-0 sm:space-x-3 flex flex-col sm:flex-row justify-center xl:justify-start">
            <Button asChild type="submit" className="rounded-full w-full sm:w-auto">
              <Link href={"/sign-up"}>Get started</Link>
            </Button>
            <Button asChild variant={"secondary"} className="rounded-full w-full sm:w-auto">
              <Link href={"/login"}>Login</Link>
            </Button>
          </div>
        </div>
      </main>
  );
}
