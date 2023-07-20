
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Login, Logout } from '@/components/AuthButtons';

export default async function Profile() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex-1 flex center">
      {session?.user ?
        <div className="grid grid-cols-2 center w-[360px] h-[300px] pe-4 py-8 bg-gray-800 glassmorphism rounded-lg bg-opacity-60">
          <div className="flex center">
            {session.user.image ? <Image src={session.user.image} alt="Profile Image" width={140} height={140} className="rounded-xl" />
              : <div className="w-[140px] h-[140px] rounded-xl bg-teal-500" />
            }
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl font-medium">{session.user.name}</span>
            <span>{session.user.email}</span>
          </div>
          <div className="flex center col-span-2">
            <Logout />
          </div>
        </div>
        :
        <div className="flex flex-col w-[360px] h-[240px] justify-center items-center bg-gray-800 glassmorphism rounded-lg bg-opacity-60">
          <span className="text-xl font-medium">Please Login</span >
          <Login />
        </div>
      }

    </main>
  )
}