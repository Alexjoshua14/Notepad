
import { Session } from "next-auth";

import Image from 'next/image';

import { Logout } from './AuthButtons';
import { publishPost, deletePost } from "@/lib/posts";
import Link from "next/link";
import { Post } from "../types";
import { use } from "react";

export function PostItem({ post }: { post: Post }) {
  return (
    <li key={post.id} className="flex flex-col w-[300px] py-4 px-8 gap-2 rounded glassmorphism-white">
      <span className="text-lg font-semibold text-zinc-900">{post.title}</span>
      <span className="text-sm font-light text-zinc-800">{post.content}</span>
    </li>
  )
}

export function PostItemBrief({ post }: { post: Post }) {
  return (
    <li key={post.id} className="flex flex-col w-full py-4 px-2 gap-2 rounded glassmorphism-white">
      <span className="text-lg font-semibold text-zinc-900 whitespace-nowrap text-ellipsis overflow-hidden">{post.title}</span>
      <span className="text-sm font-light text-zinc-800 whitespace-nowrap text-ellipsis overflow-hidden">{post.content}</span>
      {!post.published &&
        <div className="flex center gap-4">
          <Link
            href={`/new_note/${post.id}`}
            className="w-20 bg-zinc-700 text-white flex center glassmorphism glassmorphism-2-interactive rounded"
          >
            Edit
          </Link>
          <button
            className="w-20 bg-green-700 text-white flex center glassmorphism glassmorphism-2-interactive rounded"
            onClick={() => publishPost(post.id)}
          >
            Publish
          </button>
          <button
            className="w-20 bg-red-700 text-white flex center glassmorphism glassmorphism-2-interactive rounded"
            onClick={() => deletePost(post.id)}
          >
            Delete
          </button>
        </div>
      }
      {post.published &&
        <div className="flex center gap-4">
          <Link
            href={`/new_note/${post.id}`}
            className="w-20 bg-zinc-700 text-white flex center glassmorphism glassmorphism-2-interactive rounded"
          >
            Edit
          </Link>
          <button
            className="w-20 bg-red-700 text-white flex center glassmorphism glassmorphism-2-interactive rounded"
            onClick={() => deletePost(post.id)}
          >
            Delete
          </button>
        </div>
      }
    </li >
  )
}

export function PostItemBriefSkeleton({ index }: { index: number }) {
  return (
    <li key={index} className="flex flex-col w-full py-4 px-2 gap-2 rounded glassmorphism-white">
      <span className="text-lg font-semibold text-zinc-900 whitespace-nowrap text-ellipsis overflow-hidden w-[60%] h-[1.75rem] bg-zinc-900 glassmorphism rounded" />

      <span className="text-sm font-light text-zinc-800 whitespace-nowrap text-ellipsis overflow-hidden w-full h-[1.25rem] bg-zinc-800 glassmorphism rounded" />
    </li>
  )
}

export function ProfileCard({ session }: { session: Session | null }) {
  return (
    <div className="grid grid-cols-2 center w-[340px] sm:w-[360px] md:w-[480px] lg:w-[600px] h-[240px] pe-4 py-2 glassmorphism-white rounded cursor-default" >
      <div className="flex center">
        {session?.user?.image ? <Image src={session.user.image} alt="Profile Image" width={140} height={140} className="rounded glassmorphism" />
          : <div className="w-[140px] h-[140px] rounded bg-gradient-to-tr from-teal-600 to-teal-400 glassmorphism" />
        }
      </div>
      <div className="flex flex-col gap-2">
        {session?.user ?
          <span className="text-xl font-medium text-ellipsis overflow-hidden max-h-[3.5rem]">{session.user.name}</span>
          : <><span className="w-[70%] h-[1.5rem] bg-zinc-600 glassmorphism rounded" /> <span className="w-[50%] h-[1.5rem] bg-zinc-600 glassmorphism rounded" /></>
        }
        {session?.user ?
          <span className="text-ellipsis overflow-hidden max-h-[1.75rem]">{session?.user?.email}</span>
          : <span className="w-[90%] h-[1.5rem] bg-zinc-600 glassmorphism rounded" />
        }
      </div>
      <div className="flex center col-span-2">
        <Logout />
      </div>
    </div >
  )
}