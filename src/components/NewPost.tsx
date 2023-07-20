'use client'

import React, { useState } from 'react'

export function NewPost() {
  const [title, setTitle] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <form className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="p-4 text-lg rounded-md my-2 bg-zinc-200"
        ></textarea>
      </div>
      <div className={`flex items-center justify-between gap-2`}>
        <p className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : ""}`}>
          {`${title.length}/300`}
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