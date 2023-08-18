'use client'

import React, { useEffect } from 'react'
import { Session } from "next-auth";

import { getPosts } from "@/lib/posts";
import { getDemoPosts } from "@/lib/demo";
import { PostItemBrief, PostItemBriefSkeleton } from "./Cards";
import { DemoPostItemBrief } from "./demoComponents";
import { Post } from "../types";

export default function UserPosts({ session }: { session: Session }) {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [isFetching, setIsFetching] = React.useState<boolean>(true);
  const [tab, setTab] = React.useState<'drafts' | 'posts'>('posts');

  useEffect(() => {
    try {
      const fetchPosts = async () => {
        setIsFetching(true);
        const data = await getPosts();

        setIsFetching(false);

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
            <PostItemBrief key={post.id} post={post} />
          ))}
      </ul>
    </div>

  )
}