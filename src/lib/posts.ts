'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { Post } from "@/types";

 
export async function addPost(formData: FormData, publish: boolean) {
  const session = await getServerSession(authOptions);
  console.log("Session: ", session);

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
        published: publish,
      }
    });

    revalidatePath('/');
    return post;
  } catch (err) {
    console.log(err);
    return err;
  }
}

//Updates a post
export async function updatePost(post: Post, formData: FormData) {
  const session = await getServerSession(authOptions);

  const title = formData.get('title')?.toString().trim();
  const content = formData.get('content')?.toString().trim();

  if (!session?.user) {
    throw new Error('You must be signed in to add a post.');
  }

  if (!title) {
    throw new Error('You must provide a title.');
  }

  if (!content) {
    throw new Error('You must provide content.');
  } else if (content.length > 300) {
    throw new Error('Content must be less than 300 characters.');
  }

  // Update post in database
  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: post.id
      },
      data: {
        title,
        content,
      }
    });

    revalidatePath('/');
    return updatedPost;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function getPublishedPosts() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('You must be signed in to view posts.');
  }

  try {
    const posts: Post[] = await prisma.post.findMany({where: {published: true}});
    return posts;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getPost(id: number) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('You must be signed in to view posts.');
  }

  try {
    const res = await prisma.post.findUnique({where: {id}});
    if (!res) {
      throw new Error('No post found.'); 
    }
    const post: Post = res;
    return post;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getPosts() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('You must be signed in to view posts.');
  }

  try {
    const posts: Post[] = await prisma.post.findMany();
    return posts;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function publishPost(id: number) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('You must be signed in to publish a post.');
  }

  try {
    const post = await prisma.post.update({
      where: {
        id
      },
      data: {
        published: true
      }
    });

    revalidatePath('/');
    return post;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function deletePost(id: number) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('You must be signed in to delete a post.');
  }
  
  try {
    const post = await prisma.post.delete({
      where: {
        id,
        // authorId: session.user.id
      }
    });

    revalidatePath('/');
    return post;
  } catch (err) {
    console.log(err);
    return err;

  }
}

export async function getUnpublishedPosts() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('You must be signed in to view posts.');
  }

  try {
    const posts: Post[] = await prisma.post.findMany({where: {published: false, author: {id: session.user.id}}});
    return posts;
  } catch (err) {
    console.log(err);
    return [];
  }
}