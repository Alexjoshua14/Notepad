'use client'

import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

import { motion } from 'framer-motion';

import { IoAddOutline } from 'react-icons/io5';

export function Login() {
  return (
    <li className="list-none">
      <button onClick={() => signIn("github")} id="loginButton" className="text-sm bg-zinc-800 text-white py-2 px-6 rounded glassmorphism glassmorphism-3-interactive disabled:opacity-25 hover:bg-opacity-40">
        Sign in
      </button>
    </li>
  )
}

export function Logout() {
  return (
    <button onClick={() => signOut()} id="signoutButton" className="text-sm bg-red-600 text-white py-2 px-6 rounded glassmorphism glassmorphism-3-interactive disabled:opacity-25">
      Sign out
    </button>
  )
}

export function LoggedIn({ imgUrl }: { imgUrl?: string | null }) {
  return (
    <li className="flex gap-8 items-center list-none">
      <Link href="/new_note" id="newNoteLink">
        <motion.div
          initial={{ rotate: 0, scale: 1 }}
          whileHover={{ rotate: 180, scale: 1.25 }}
        >
          <IoAddOutline size={34} className="text-teal-200" />
        </motion.div>
      </Link>
      <Link href="/profile" id="profileLink" >
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          {imgUrl ? <Image src={imgUrl} alt="Profile Image" width={50} height={50} className="rounded-full" /> : <div className="w-[40px] rounded-full bg-teal-700 glassmorphism" />}
        </motion.div>
      </Link>
    </li>
  )
}