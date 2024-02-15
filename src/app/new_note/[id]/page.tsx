import React, { useState } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/oauth/authOptions';

import { NewPost, NewPostSkeleton } from '@/components/NewPost';
import { getPost } from '@/lib/posts';
import { Post } from '@/types';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

// have the prop default to null
export default async function EditNote({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  // TODO: Make sure that the User is logged in and that the post belongs to them

  let post: Post | null = null;

  //Converts the query string to id number

  const id = parseInt(params.id);

  if (typeof (id) == 'number') {
    console.log("Post ID: ", id);
    post = await getPost(id);
    console.log("Post: ", post);
  } else {
    console.log("Unable to parse post ID from query string..");
  }

  if (session.user.id != post?.authorId) {
    console.log("User is not the author of this post..");
    redirect("/new_note");
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