import Link from 'next/link'

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/oauth/authOptions';

import { LoggedIn, Login } from './AuthButtons';
import { DemoLoggedIn, DemoLogout } from '@/components/demoComponents';
import { getDemoUser } from '@/lib/demo';

export async function Nav() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex justify-between items-center w-full h-20 py-4 px-8 fixed top-0 z-30 bg-gray-950 glassmorphism-white">
      <Link href="/" id="homeLink">
        <h1 className="logo hover:scale-110 transition">
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

export async function DemoNav() {
  let loggedIn = true;

  const demoUser = await getDemoUser();

  return (
    <nav className="flex justify-between items-center w-full h-20 py-4 px-8 fixed top-0 z-30 bg-gray-950 glassmorphism-white">
      <Link href="/demo" id="homeLink">
        <h1 className="logo hover:scale-110 transition">
          Notepad
        </h1>
      </Link>
      <DemoLogout />
      <ul className="list-none">
        <DemoLoggedIn />
      </ul>
    </nav>
  )
}