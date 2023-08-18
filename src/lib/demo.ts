// Get demo posts

const demoUser = {
  id: '182930',
  name: 'Demo User',
  email: 'demo@gmail.com',
  image: '',
}

const demoPosts = [
   {
      id: 1,
      title: 'Demo post 1',
      content: 'Welcome to a simple demo of Notepad!',
      published: true,
      authorId: '182930',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: 'Demo post 2',
      content: 'This demo shows some of the application\'s capabilities.',
      published: true,
      authorId: '182930',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      title: 'Demo shortcomings',
      content: 'The demo does not include: OAuth authentication, fleshed out user profiles, nor any database connectivity.',
      published: true,
      authorId: '182930',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      title: 'Demo post 4',
      content: 'Here is an example of an unpublished post.',
      published: false,
      authorId: '182930',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      title: 'Demo post 5',
      content: 'Here is an example of yet another unpublished post.',
      published: false,
      authorId: '182930',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
]

export const getDemoUser = async () => {
  return demoUser;
}

export const getDemoPosts = async () => {
  return demoPosts;
}

export const getPublishedDemoPosts = async () => {
  return demoPosts.filter(post => post.published);
}

export const getUnpublishedDemoPosts = async () => {
  return demoPosts.filter(post => !post.published);
}