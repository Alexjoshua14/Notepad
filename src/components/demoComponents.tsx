'use client'

import React from 'react';
import Link from 'next/link';

import { Post } from '@/types';
import { getDemoPosts } from '@/lib/demo';
import { PostItemBriefSkeleton } from './Cards';
import { useEffect } from 'react';

import { motion } from 'framer-motion';
import { IoAddOutline } from 'react-icons/io5';
import { GiNinjaVelociraptor } from 'react-icons/gi';

export function DemoLogout() {
  return (
    <Link href="/" id="exitDemo" className="text-sm bg-red-600 text-white py-2 px-6 rounded glassmorphism glassmorphism-3-interactive disabled:opacity-25">
      Leave Demo
    </Link>
  )
}

export function DemoLoggedIn() {
  return (
    <li className="flex gap-8 items-center list-none">
      <Link href="/demo/new_note" id="newNoteLink">
        <motion.div
          initial={{ rotate: 0, scale: 1 }}
          whileHover={{ rotate: 180, scale: 1.25 }}
        >
          <IoAddOutline size={34} className="text-teal-200" />
        </motion.div>
      </Link>
      <Link href="/demo/profile" id="profileLink"  >
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          <GiNinjaVelociraptor size={40} className="text-teal-200 px-2 py-2 rounded-full bg-teal-700 glassmorphism" />
        </motion.div>
      </Link>
    </li>
  )
}


export function DemoPostItemBrief({ post }: { post: Post }) {
  return (
    <li key={post.id} className="flex flex-col w-full py-4 px-2 gap-2 rounded glassmorphism-white">
      <span className="text-lg font-semibold text-zinc-900 whitespace-nowrap text-ellipsis overflow-hidden">{post.title}</span>
      <span className="text-sm font-light text-zinc-800 whitespace-nowrap text-ellipsis overflow-hidden">{post.content}</span>
      {!post.published &&
        <div className="flex center gap-4">
          <div
            className="w-20 bg-zinc-700 text-white flex center glassmorphism glassmorphism-2-interactive rounded"
          >
            Edit
          </div>
          <div
            className="w-20 bg-green-700 text-white flex center glassmorphism glassmorphism-2-interactive rounded cursor-pointer"
          >
            Publish
          </div>
          <div
            className="w-20 bg-red-700 text-white flex center glassmorphism glassmorphism-2-interactive rounded cursor-pointer"
          >
            Delete
          </div>
        </div>
      }
      {post.published &&
        <div className="flex center gap-4">
          <div
            className="w-20 bg-zinc-700 text-white flex center glassmorphism glassmorphism-2-interactive rounded"
          >
            Edit
          </div>
          <div
            className="w-20 bg-red-700 text-white flex center glassmorphism glassmorphism-2-interactive rounded"
          >
            Delete
          </div>
        </div>
      }
    </li >
  )
}


export function DemoUserPosts() {

  const [posts, setPosts] = React.useState<Post[]>([]);
  const [isFetching, setIsFetching] = React.useState<boolean>(true);
  const [tab, setTab] = React.useState<'drafts' | 'posts'>('posts');

  useEffect(() => {
    const fetchPosts = async () => {
      setIsFetching(true);
      const data = await getDemoPosts();

      setIsFetching(false);

      setPosts(data);
    }

    fetchPosts();

  }, []);

  const postsToDisplay = () => {
    if (tab == 'drafts')
      return posts.filter(post => !post.published);
    else
      return posts.filter(post => post.published);
  }

  return (
    <div className="flex flex-col center gap-4 w-full mx-2 sm:mx-14">
      <div className="flex gap-2">
        <button onClick={() => setTab('posts')} id="postsTab" className={`posts-section-button ${tab == 'posts' ? "glassmorphism-4" : "glassmorphism-1-interactive"}`}>
          Posts
        </button>
        <button onClick={() => setTab('drafts')} id="draftsTab" className={`posts-section-button ${tab == 'drafts' ? "glassmorphism-4" : "glassmorphism-1-interactive"}`}>
          Drafts
        </button>
      </div>
      <ul className="flex flex-col gap-2 center w-[80%]">
        {isFetching ?
          [0, 1, 2, 3, 4].map((i) => {
            return (<PostItemBriefSkeleton key={i} index={i} />)
          })
          : postsToDisplay().map((post) => (
            <DemoPostItemBrief key={post.id} post={post} />
          ))}
      </ul>
    </div>

  )
}