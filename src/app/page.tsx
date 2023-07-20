

import { NewPost } from '@/components/NewPost';
import { getPosts } from '@/lib/posts';

export default async function Home() {
  const posts = await getPosts();
  console.log(posts);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1>Hello World!</h1>
        <ul className="flex flex-col gap-4 center w-full border-2 border-teal-500">
          {posts.map((post) => (
            <li key={post.id} className="py-4 px-8 flex flex-col gap-2 bg-zinc-200 rounded-md glassmorphism">
              <span className="text-lg font-medium">{post.title}</span>
              <span className="text-sm font-light">{post.content}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
