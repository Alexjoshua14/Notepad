
import { getPosts } from '@/lib/posts';

import { Post } from '@/types';

import { PostItem } from '@/components/Cards';
import { getPublishedDemoPosts } from '@/lib/demo';

export default async function Home() {
  let posts: Post[] = [];

  try {
    posts = await getPublishedDemoPosts();
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