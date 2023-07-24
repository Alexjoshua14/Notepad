'use client'

import React, { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { addPost, updatePost, publishPost } from '@/lib/posts'
import { Post } from '@/types'

const validTitle = (post: Post | null, title: string) => {
  title = title.trim();
  return title.length > 0;
}

const validContent = (post: Post | null, content: string) => {
  content = content.trim();
  return content.length > 0 && content.length < 300;
}

const postChanged = (post: Post | null, title: string, content: string) => {
  if (post == null) {
    return true;
  }
  title = title.trim();
  content = content.trim();
  return post.title !== title || post.content !== content;
}

export function NewPost({ post }: { post: Post | null }) {
  const [title, setTitle] = useState(post?.title ?? '');
  const [content, setContent] = useState(post?.content ?? '');
  const [isDisabled, setIsDisabled] = useState(true);

  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    setIsDisabled(true);

    if (!formData.get('title')) {
      //Shake the title input

      return;
    }

    if (!formData.get('content')) {
      //Shake the content input

      return;
    }
    try {

      if (post != null) {
        updatePost(post, formData)
        if (!post.published) publishPost(post.id);
      } else {
        addPost(formData, true)
      }

      setTitle('');
      setContent('');
      setIsDisabled(false);
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  }

  const handleSave = () => {
    setIsDisabled(true);
    try {
      if (validTitle(post, title) && validContent(post, content) && postChanged(post, title, content)) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (post != null) {
          updatePost(post, formData)
        } else {
          addPost(formData, false)
        }
      }
      setIsDisabled(false);
    } catch (err) {
      console.error(err);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //Disable/enable submit button based on title and content length
    if (e.target.name === 'title') {
      setTitle(e.target.value);
      if (validTitle(post, e.target.value) && validContent(post, content) && postChanged(post, e.target.value, content)) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    } else if (e.target.name === 'content') {
      setContent(e.target.value);
      if (validTitle(post, title) && validContent(post, e.target.value) && postChanged(post, title, e.target.value)) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }

  }

  return (
    <form id="new-post-form" className="glassmorphism-white rounded my-8 p-2 sm:p-8 w-[340px] sm:w-[400px] md:w-[500px] lg:w-[600px]" action={handleSubmit}>
      <div className="flex flex-col my-4">
        <div className="flex flex-col md:flex-row justify-between py-2">
          <label htmlFor="title" className="text-xl mx-2 md:py-4" >Title:</label>
          <textarea
            name="title"
            placeholder='My Latest Adventure..'
            value={title}
            onChange={e => handleChange(e)}
            className="px-4 py-2 text-lg m-2 resize-none glassmorphism-white rounded h-14 outline-none focus:bg-opacity-60 lg:w-[400px]"
            maxLength={34}
            id='title'
            aria-label='Title'
            required
          ></textarea>
        </div>
        <div className="flex flex-col md:flex-row justify-between py-2">
          <label htmlFor="content" className="text-xl md:py-4 mx-2" >Content:</label>
          <textarea
            name="content"
            id="content"
            placeholder='It began with a..'
            value={content}
            maxLength={300}
            onChange={e => handleChange(e)}
            className="px-4 py-2 text-lg m-2 resize-none glassmorphism-white rounded h-40 focus:bg-opacity-60 outline-none lg:w-[400px]"
            required
          ></textarea>
        </div>
      </div>
      <div className={`flex items-center justify-between gap-2`}>
        <p className={`font-bold text-sm ${content.length > 300 ? "text-red-700" : ""}`}>
          {`${content.length}/300`}
        </p>
        <div className="flex gap-2 w-1/2 min-w-[220px]">
          <button
            disabled={isDisabled}
            className={`flex center text-white py-2 px-6 glassmorphism rounded bg-zinc-800 w-1/3
          disabled:opacity-25 ${isDisabled ? "glassmorphism-3" : "glassmorphism-3-interactive"}`}
            type="button"
            aria-label="Save"
            onClick={() => handleSave()}
          >
            {`Save`}
          </button>
          <button
            disabled={isDisabled}
            className={`flex center text-white py-2 px-6 glassmorphism rounded bg-purple-800 w-2/3
          disabled:opacity-25 ${isDisabled ? "glassmorphism-3" : "glassmorphism-3-interactive"}`}
            type="submit"
          >
            {post === null ? `Create a Post` : `Post`}
          </button>
        </div>
      </div>
    </form>
  )
}