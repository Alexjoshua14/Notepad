
import { NewPost } from '@/components/NewPost';
import { Post } from '@/types';

// have the prop default to null
export default function NewNote({ post }: { post: Post | null }) {
  return (
    <main className="flex-1 h-full w-full flex center">
      <section className="section-main">
        <h1 className="header">{`What's on your mind?`}</h1>
        <div className="flex-1 flex center">
          <NewPost post={post} />
        </div>
      </section>
    </main>
  )
}