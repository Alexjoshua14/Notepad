'use client'

import React, { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { addPost, updatePost, publishPost } from '@/lib/posts'
import { validUpdate } from '@/lib/utils'
import { Post } from '@/types'


export function NewPost({ post }: { post?: Post | null }) {
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

      //Ensure title and content are valid
      if (validUpdate(title, content, post)) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (post) {
          updatePost(post, formData)
        } else {
          addPost(formData, false)
          router.push('/')
        }
      }

      //Show post as saved
      setIsDisabled(false);
    } catch (err) {
      console.error(err);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

    //Disable/enable submit button based on title and content length
    if (e.target.name === 'title') {
      setTitle(e.target.value);
      if (validUpdate(e.target.value, content, post)) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    } else if (e.target.name === 'content') {
      setContent(e.target.value);
      if (validUpdate(title, e.target.value, post)) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }

  }

  return (
    <form id="new-post-form" className="flex flex-col justify-between glassmorphism-white rounded my-8 p-2 sm:p-8 w-[340px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[480px]" action={handleSubmit}>
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
            {`Post`}
          </button>
        </div>
      </div>
    </form>
  )
}

export function NewPostSkeleton() {
  return (
    <form id="new-post-form" className="flex flex-col justify-between glassmorphism-white rounded my-8 p-2 sm:p-8 w-[340px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[480px]" >
      <div className="flex flex-col my-4 gap-4">
        <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-4 py-2">
          <div className="bg-zinc-950 w-[140px] h-[1.75rem] glassmorphism rounded" />
          <div className="w-full h-[56px]">
            <div className="bg-zinc-900 w-full h-[1.75rem] glassmorphism rounded" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-4 py-2">
          <div className="bg-zinc-950 w-[140px] h-[1.75rem] glassmorphism rounded" />
          <div className="flex flex-col gap-2 w-full h-[160px]">
            <div className="bg-zinc-900 w-[70%] h-[1.75rem] glassmorphism rounded" />
            <div className="bg-zinc-900 w-[80%] h-[1.75rem] glassmorphism rounded" />
            <div className="bg-zinc-900 w-[40%] h-[1.75rem] glassmorphism rounded" />
          </div>
        </div>
      </div>
      <div className={`flex items-center justify-between gap-2`}>
        <p className={`font-bold text-sm w-[70px] bg-zinc-700 h-[1.25rem] glassmorphism rounded`}>

        </p>
        <div className="flex gap-2 w-1/2 min-w-[220px] h-[2rem]">
          <button
            disabled={true}
            className={`flex center text-white py-2 px-6 glassmorphism rounded bg-zinc-800 w-1/3
          disabled:opacity-25 glassmorphism-3`}
            type="button"
          />
          <button
            disabled={true}
            className={`flex center text-white py-2 px-6 glassmorphism rounded bg-purple-800 w-2/3
          disabled:opacity-25 glassmorphism-3`}
            type="submit"
          />
        </div>
      </div>
    </form>
  )
}