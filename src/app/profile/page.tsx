
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Login, Logout } from '@/components/AuthButtons';
import UserPosts from '@/components/UserPosts';

import { ProfileCard } from '@/components/Cards';

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (session?.user == null) {
    return (
      <main className="flex-1 h-full w-full flex center">
        <div className="flex flex-col w-[340px] sm:w-[360px] h-[240px] center gap-8 glassmorphism-white rounded">
          <h1 className="text-xl font-medium">Please Login..</h1>
          <Login />
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 h-full w-full sm:px-4 flex flex-col items-center gap-8">
      <ProfileCard session={session} />
      <UserPosts session={session} />
    </main>
  )
}