import React from 'react'

const Card = () => {
  return (
    <div>
      <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-pink-700 dark:border-pink-600">
    <button href="#">
        <img class="p-8 rounded-t-lg" src="" alt="" />
    </button>
    <div class="px-5 pb-5">
        <button href="#">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">nombre producto</h5>
        </button>
       
        <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">precio</span>
            <button href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
        </div>
    </div>
</div>
    </div>
  )
}

export default Card