import React from 'react'

export const GlobalFilter = ({filter, setFilter}) => {
  return (
    <span className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
        Search: {''}
        <input className='bg-slate-300 ' onChange={e=> setFilter(e.target.value)} value={filter || ''} type="text" />

    </span>
  )
}
