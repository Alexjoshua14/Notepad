
import { Post } from "../types";
import { Session } from "next-auth";

import Image from 'next/image';

import { Logout } from './AuthButtons';

export function PostItem({ key, post }: { key: number, post: Post }) {
  return (
    <li key={post.id} className="py-4 px-8 flex flex-col gap-2 rounded glassmorphism-white">
      <span className="text-lg font-semibold text-zinc-900">{post.title}</span>
      <span className="text-sm font-light text-zinc-800">{post.content}</span>
    </li>
  )
}

export function ProfileCard({ session }: { session: Session | null }) {
  return (
    <div className="grid grid-cols-2 center w-[360px] h-[300px] pe-4 py-8 glassmorphism-white rounded cursor-default" >
      <div className="flex center">
        {session?.user?.image ? <Image src={session.user.image} alt="Profile Image" width={140} height={140} className="rounded" />
          : <div className="w-[140px] h-[140px] rounded bg-gradient-to-tr from-teal-600 to-teal-400 glassmorphism" />
        }
      </div>
      <div className="flex flex-col gap-2">
        {session?.user ?
          <span className="text-xl font-medium">{session.user.name}</span>
          : <><span className="w-[70%] h-[1.5rem] bg-zinc-600 glassmorphism rounded" /> <span className="w-[50%] h-[1.5rem] bg-zinc-600 glassmorphism rounded" /></>
        }
        {session?.user ?
          <span>{session?.user?.email}</span>
          : <span className="w-[90%] h-[1.5rem] bg-zinc-600 glassmorphism rounded" />
        }
      </div>
      <div className="flex center col-span-2">
        <Logout />
      </div>
    </div >
  )
}