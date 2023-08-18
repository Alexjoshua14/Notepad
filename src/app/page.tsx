
import { getPosts } from '@/lib/posts';

import { Post } from '@/types';

import { PostItem } from '@/components/Cards';
import { getPublishedPosts } from '@/lib/posts';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main>
        <section className="h-full w-full flex flex-col center">
          <div className="min-w-[300px] px-4 py-2 flex flex-col center gap-4 glassmorphism-white rounded text-center">
            <h1 className="header font-medium">Welcome to Notepad!</h1>
            {/* Some simple description of the app in a p tag */}
            <p className="text-zinc-700">
              Notepad is a simple note taking app that allows you to take notes and save them to your account.
              This application uses Github OAuth to authenticate users and Supabase to store securely data.
            </p>
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-zinc-700">
                If you would like to try a demo of the app, click the button below!
              </p>
              <Link href="/demo" className="text-zinc-700 w-fit px-4 py-2 bg-teal-400 rounded glassmorphism glassmorphism-2-interactive">
                Try Demo!
              </Link>
            </div>
          </div>
        </section>
      </main>
    )
  }

  let posts: Post[] = [];
  try {
    posts = await getPublishedPosts();
  } catch (err) {
    console.error(err);
  }

  return (
    <main className="h-full w-full flex flex-col center">
      <section className="section-main">
        <h1 className="header">
          Notes
        </h1>
        <ul id="feed" className="list">
          {posts.length === 0 ?
            <h1>{`No posts to show..`}</h1>
            :
            posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))
          }
        </ul>
      </section>
    </main>
  )
}
