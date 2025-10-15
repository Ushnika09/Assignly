import React from 'react'

const Footer = () => {
  return (
    <div className='px-7 py-3 flex justify-between items-center shadow shadow-neutral-600'>
        {/* logo */}
      <div className='flex gap-2 items-center'>
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-emerald-500 shadow-sm flex items-center justify-center text-white font-bold text-xl">A</div>
      <div className="leading-tight">
        <div className="text-lg font-bold tracking-tight text-accent">Assignly</div>
        <div className="text-[11px] text-gray-800/60">Manage agents. Assign tasks.</div>
      </div>
      </div>
      <h1>© 2025 Assignly. All rights reserved.</h1>
    </div>
  )
}

export default Footer