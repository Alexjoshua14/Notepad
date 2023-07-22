
import { getPosts } from '@/lib/posts';

import { Post } from '@/types';

import { PostItem } from '@/components/Cards';

export default async function Home() {
  let posts: Post[] = [];
  try {
    posts = await getPosts();
  } catch (err) {
    console.error(err);
  }
  console.log(posts);

  return (
    <main className="h-full w-full flex flex-col center px-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <ul className="flex flex-col gap-4 center w-full">
          {posts.length === 0 ?
            <h1>{`No posts to show..`}</h1>
            :
            posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))

          }
        </ul>
      </div>
    </main>
  )
}
