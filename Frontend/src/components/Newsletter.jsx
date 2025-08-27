import React from 'react'

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 my-32">
      <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Blog!</h1>
      <p className="md:text-lg text-gray-500/70 pb-8">
        Subscribe to get the latest blog, new tech, and exclusive news.
      </p>

    <form className="flex items-center justify-between w-full max-w-2xl h-12">
  <input
    type="text"
    placeholder="Enter your email id"
    required
    className="border border-gray-300 h-full w-full px-3 text-gray-500 outline-none rounded-md rounded-r-none border-r-0"
  />
  <button
    type="submit"
    className="h-full px-8 md:px-12 text-white bg-[#5044E5] hover:bg-[#5044E5]/90 transition-all cursor-pointer rounded-md rounded-l-none"
  >
    Subscribe
  </button>
</form>

    </div>
  )
}

export default Newsletter
