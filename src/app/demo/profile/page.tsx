import { ProfileCard } from "@/components/Cards";
import { DemoUserPosts } from "@/components/demoComponents";

export default function DemoProfile() {
  return (
    <main className="flex-1 h-full w-full sm:px-4 flex flex-col items-center gap-8">
      <ProfileCard session={null} demo={true} />
      <DemoUserPosts />
    </main>
  )
}