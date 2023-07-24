
import { NewPost, NewPostSkeleton } from '@/components/NewPost';

export default async function Loading() {

  return (
    <main className="flex-1 h-full w-full flex center">
      <section className="section-main">
        <h1 className="header">{`What's on your mind?`}</h1>
        <div className="flex-1 flex center">
          <NewPostSkeleton />
        </div>
      </section>
    </main>
  )
}