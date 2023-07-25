//import functions to test
import { expect, describe, beforeEach, test, vi } from 'vitest';
import prisma from "@/lib/__mocks__/prisma";
import { addPost, getPosts, getUnpublishedPosts } from "@/lib/posts";
import { Post } from "@prisma/client";

const session = {
  user: {
    id: "123456789",
    name: 'Lua',
    email: 'lua@gmail.com',
    image: 'test.png',
  }
}

 //Mock getServerSession
  vi.mock('next-auth', async () => {
    const actual = await vi.importActual('next-auth') as typeof import('next-auth');
    return {
      ...actual,
      getServerSession: vi.fn(() => {return session})
    }
  });

// Tells testing suite that prisma is being mocked
vi.mock('@/lib/prisma')

//Mock revalidatePath
  vi.mock('next/cache', () => ({
    revalidatePath: vi.fn()
  }));

/** User Management */
test('should create a user', async () => {
  // TODO: Write test
})

test('should get user information', async () => {
  // TODO: Write test 
})

test('should update name information', async () => {
  // TODO: Write test
})

test('should update email information', async () => {
  // TODO: Write test
})

test('should delete user', async () => {
  // TODO: Write test
})


/** Post Creation */
describe('New Post creation', async () => {
  const post: Post = {
    id: 1,
    createdAt: new Date("2021-01-01"),
    updatedAt: new Date("2021-01-01"),
    published: false,
    title: 'Test Post',
    content: 'This is a test post',
    authorId: session.user.id,
  }
  const formData = new FormData();
  formData.append('title', post.title);
  formData.append('content', post.content!);

  //Mock console.log
  vi.spyOn(console, 'log').mockImplementation(() => {});

  beforeEach(() => {
    //Reset formData
    formData.set('title', post.title);
    formData.set('content', post.content!);
  })

  test('should create a post', async () => {
  //Mock prisma.post.create
  prisma.post.create.mockResolvedValue({ ...post, published: true });

  //Run the code
  const result = await addPost(formData, true);

  //Check the results
  expect(result).toEqual({...post, published: true});
  })

  test('should create a draft', async () => {
    //Mock prisma.post.create
    prisma.post.create.mockResolvedValue(post);

    //Run the code
    const result = await addPost(formData, false);
    expect(result).toStrictEqual(post);
  })

  test('should fail to create a post due to missing title', async () => {
    //Override the title in post to be empty
    formData.set('title', '');

    //Run code and catch expected errors
    await expect(addPost(formData, false)).rejects.toThrow()
    await expect(addPost(formData, false)).rejects.toThrow('You must provide a title.');
  })

  test('should fail to create a post due to missing content', async () => {
    //Override the content in post to be empty
    formData.set('content', '');

    //Run code and catch expected errors
    await expect(addPost(formData, false)).rejects.toThrow()
    await expect(addPost(formData, false)).rejects.toThrow('You must provide content.');
  })

  test('should fail to create a post due to content length' , async () => {
    let longContent = '';
    for(let i = 0; i < 301; i++) {
      longContent += 'a';
    }

    //Override the content in post to be too long
    formData.set('content', longContent);
    await expect(addPost(formData, false)).rejects.toThrow()
    await expect(addPost(formData, false)).rejects.toThrow('Content must be less than 300 characters.');
  })
})

/** Post Retrieval */
describe('Post Retrieval', async () => {
  //Create an array of posts
  const posts: Post[] = [
    {
      id: 1,
      createdAt: new Date("2021-01-01"),
      updatedAt: new Date("2021-01-01"),
      published: false,
      title: 'Test Post',
      content: 'This is a test post',
      authorId: session.user.id,
    },
    {
      id: 2,
      createdAt: new Date("2021-01-01"),
      updatedAt: new Date("2021-01-01"),
      published: true,
      title: 'Test Post 2',
      content: 'This is a test post 2',
      authorId: session.user.id,
    },
    {
      id: 3,
      createdAt: new Date("2021-01-01"),
      updatedAt: new Date("2021-01-01"),
      published: true,
      title: 'Test Post 3',
      content: 'This is a test post 3',
      authorId: session.user.id,
    },
    {
      id: 4,
      createdAt: new Date("2021-01-01"),
      updatedAt: new Date("2021-01-01"),
      published: false,
      title: 'Test Post 4',
      content: 'This is a test post 4',
      authorId: "098765432",
    }
  ]

  test('should get all posts', async () => {
    //Mock prisma.post.findMany
    prisma.post.findMany.mockResolvedValue(posts);

    //Run the code
    const result = await getPosts();

    //Check the results
    expect(result).toEqual(posts);
  })

  test('should get all drafts for a user', async () => {
    //Mock prisma.post.findMany
    const drafts = posts.filter(post => !post.published && post.authorId === session.user.id);
    prisma.post.findMany.mockResolvedValue(drafts);

    //Run the code
    const result = await getUnpublishedPosts();

    //Check the results
    expect(result).toEqual(drafts);
  })

  test('should get all published posts for a user', async () => {
    // TODO: Write test
  
    //Mock prisma.post.findMany
    const publishedPosts = posts.filter(post => post.published && post.authorId === session.user.id);
    prisma.post.findMany.mockResolvedValue(publishedPosts);
    
    //Run the code
    const result = await getPosts();
    
    //Check the results
    expect(result).toEqual(publishedPosts);
  })

})

/** Post Management */
test('should publish a draft', async () => {
  // TODO: Write test
})

test('should delete a post', async () => {
  // TODO: Write test
})
