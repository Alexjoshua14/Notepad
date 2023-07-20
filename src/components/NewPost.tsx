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

      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <form className="bg-gray-400 glassmorphism my-8 p-8 rounded-md" action={handleSubmit}>
      <div className="flex flex-col my-4">
        <textarea
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="p-4 text-lg rounded-md my-2 bg-zinc-200 resize-none glassmorphism"
          maxLength={30}
        ></textarea>
        <textarea
          name="content"
          value={content}
          maxLength={300}
          onChange={e => setContent(e.target.value)}
          className="p-4 text-lg rounded-md my-2 bg-zinc-200 resize-none glassmorphism"
        ></textarea>
      </div>
      <div className={`flex items-center justify-between gap-2`}>
        <p className={`font-bold text-sm ${content.length > 300 ? "text-red-700" : ""}`}>
          {`${content.length}/300`}
        </p>
        <button
          disabled={isDisabled}
          className="text-white py-2 px-6 rounded-xl disabled:opacity-25 bg-fuchsia-700"
          type="submit"
        >
          Create a Post
        </button>
      </div>
    </form>
  )
}