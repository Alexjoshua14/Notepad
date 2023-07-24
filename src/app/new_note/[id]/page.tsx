import React, { useState } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { NewPost, NewPostSkeleton } from '@/components/NewPost';
import { getPost } from '@/lib/posts';
import { Post } from '@/types';
import { useEffect } from 'react';

// have the prop default to null
export default async function EditNote({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  // TODO: Make sure that the User is logged in and that the post belongs to them

  let post: Post | null = null;

  //Converts the query string to id number

  const id = parseInt(params.id);

  if (typeof (id) == 'number') {
    post = await getPost(id);
  } else {
    console.log("Unable to parse post ID from query string..");
  }

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