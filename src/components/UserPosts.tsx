'use client'

import React, { useEffect } from 'react'
import { Session } from "next-auth";

import { getPosts } from "@/lib/posts";
import { PostItemBrief, PostItemBriefSkeleton } from "./Cards";
import { Post } from "../types";
import { use } from "react";

export default function UserPosts({ session }: { session: Session }) {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [isFetching, setIsFetching] = React.useState<boolean>(true);
  const [tab, setTab] = React.useState<'drafts' | 'posts'>('posts');

  useEffect(() => {
    try {
      const fetchPosts = async () => {
        setIsFetching(true);
        const data = await getPosts();
        console.log(data);
        setIsFetching(false);
        console.log(data);
        setPosts(data);
      }

      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  }, [session]);


  if (session?.user == null) {
    return (<></>);
  }

  const postsToDisplay = () => {
    if (tab == 'drafts')
      return posts.filter(post => !post.published);
    else
      return posts.filter(post => post.published);
  }

  return (
    <div className="flex flex-col center gap-4 w-full mx-2 sm:mx-14">
      <div className="flex gap-2">
        <button onClick={() => setTab('posts')} className={`posts-section-button ${tab == 'posts' && "!bg-opacity-60"}`}>
          Posts
        </button>
        <button onClick={() => setTab('drafts')} className={`posts-section-button ${tab == 'drafts' && "!bg-opacity-60"}`}>
          Drafts
        </button>
      </div>
      <ul className="flex flex-col gap-2 center w-[80%]">
        {isFetching ?
          [0, 1, 2, 3, 4].map((i) => {
            return (<PostItemBriefSkeleton key={i} index={i} />)
          })
          : postsToDisplay().map((post) => (
            <PostItemBrief key={post.id} post={post} />
          ))}
      </ul>
    </div>

  )
}