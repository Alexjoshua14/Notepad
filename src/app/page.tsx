
import { getPosts } from '@/lib/posts';

import { Post } from '@/types';

import { PostItem } from '@/components/Cards';
import { getPublishedPosts } from '@/lib/posts';

export default async function Home() {
  let posts: Post[] = [];
  try {
    posts = await getPublishedPosts();
  } catch (err) {
    console.error(err);
  }
  console.log(posts);

  return (
    <main className="h-full w-full flex flex-col center">
      <section className="section-main">
        <h1 className="header">
          Notes
        </h1>
        <ul className="list">
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
