'use client'

import React, { useState, useTransition } from 'react'

import { addPost } from '@/lib/posts'

export function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

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

    addPost(formData)
      .then(() => {
        setTitle('');
        setContent('');
        setIsDisabled(false);
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <form id="new-post-form" className="glassmorphism-white rounded my-8 p-8 sm:w-[400px] md:w-[500px] lg:w-[600px]" action={handleSubmit}>
      <div className="flex flex-col my-4">
        <div className="flex flex-col md:flex-row justify-between py-2">
          <label htmlFor="title" className="text-xl mx-2 md:py-4" >Title:</label>
          <textarea
            name="title"
            placeholder='My Latest Adventure..'
            value={title}
            onChange={e => setTitle(e.target.value)}
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
            onChange={e => setContent(e.target.value)}
            className="px-4 py-2 text-lg m-2 resize-none glassmorphism-white rounded h-40 focus:bg-opacity-60 outline-none lg:w-[400px]"
            required
          ></textarea>
        </div>
      </div>
      <div className={`flex items-center justify-between gap-2`}>
        <p className={`font-bold text-sm ${content.length > 300 ? "text-red-700" : ""}`}>
          {`${content.length}/300`}
        </p>
        <button
          disabled={isDisabled}
          className="text-white py-2 px-6 rounded disabled:opacity-25 glassmorphism bg-purple-800"
          type="submit"
        >
          Create a Post
        </button>
      </div>
    </form>
  )
}