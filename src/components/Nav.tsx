import Link from 'next/link'

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { Login } from './AuthButtons';
import { Logout } from './AuthButtons';

export async function Nav() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex justify-between items-center py-8">
      <Link href="/">
        <h1 className="font-bold text-lg">
          Home
        </h1>
      </Link>
      <ul className="list-none">
        {session?.user ? <Logout imgUrl={session.user.image} /> : <Login />}
      </ul>
    </nav>
  )
}