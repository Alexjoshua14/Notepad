
import { NewPost } from '@/components/NewPost';
import { Post } from '@/types';

interface NewNoteProps {
  post?: Post;
}

export default function NewNote({ post }: NewNoteProps) {
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