
import { NewPost } from '@/components/NewPost';
import { Post } from '@/types';


export default function NewNote() {
  return (
    <main className="flex-1 h-full w-full flex center">
      <section className="section-main">
        <h1 className="header">{`What's on your mind?`}</h1>
        <div className="flex-1 flex center">
          <NewPost demo={true} />
        </div>
      </section>
    </main>
  )
}