'use client'

import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link'
import Image from 'next/image'

export function Login() {
  return (
    <li>
      <button onClick={() => signIn()} className="text-sm bg-zinc-700 text-white py-2 px-6 rounded-xl disabled:opacity-25">
        Sign in
      </button>
    </li>
  )
}

export function Logout({ imgUrl }: { imgUrl?: string | null }) {
  return (
    <li className="flex gap-8 items-center">
      <button onClick={() => signOut()} className=" text-sm bg-zinc-700 text-white py-2 px-6 rounded-xl disabled:opacity-25">
        Sign Out
      </button>
      <Link href="/dashboard" >
        {imgUrl ? <Image src={imgUrl} alt="Profile Image" width={50} height={50} className="rounded-full" /> : <div className="w-[40px] rounded-full bg-teal-700" />}
      </Link>
    </li>
  )
}