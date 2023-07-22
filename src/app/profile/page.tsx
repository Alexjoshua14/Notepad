
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Login, Logout } from '@/components/AuthButtons';

import { ProfileCard } from '@/components/Cards';

export default async function Profile() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex-1 flex center">
      {session?.user ?
        <ProfileCard session={session} />
        :
        <div className="flex flex-col w-[360px] h-[240px] center gap-8 glassmorphism-white rounded">
          <span className="text-xl font-medium">Please Login..</span >
          <Login />
        </div>
      }

    </main>
  )
}