import Link from 'next/link'

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import Image from 'next/image';

import { Login, LoggedIn } from './AuthButtons';

export async function Nav() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex justify-between items-center w-full h-20 py-4 px-8 fixed top-0 z-30 bg-gray-950 glassmorphism">
      <Link href="/">
        <h1 className="font-bold text-lg">
          Notepad
        </h1>
      </Link>
      <ul className="list-none">
        {session?.user ?
          <LoggedIn imgUrl={session.user.image} />
          : <Login />
        }
      </ul>
    </nav>
  )
}