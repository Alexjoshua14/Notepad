'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addPost(formData: FormData) {
  const session = await getServerSession(authOptions);

  const title = formData.get('title');
  const content = formData.get('content');

  if (!session?.user) {
    throw new Error('You must be signed in to add a post.');
  }

  if (!title || typeof title !== 'string') {
    throw new Error('You must provide a title.');
  }

  if (!content || typeof content !== 'string') {
    throw new Error('You must provide content.');
  } else if (content.length > 300) {
    throw new Error('Content must be less than 300 characters.');
  }

  // Clean title and content


  console.log(`AddPost: \n\t${formData.get('title')}\n\t${formData.get('content')}`);

  // Add post to database
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
      }
    });

    revalidatePath('/');
    return post;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany();
    return posts;
  } catch (err) {
    console.log(err);
    return [];
  }
}