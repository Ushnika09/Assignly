import React from 'react'
import { FiLogIn } from "react-icons/fi";
import { BsPeopleFill } from "react-icons/bs";
import { LuUpload } from "react-icons/lu";
import { TbArrowsSplit } from "react-icons/tb";
import Demo from './Demo';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <main className='py-[6rem] pt-[8rem] flex justify-center items-center px-7 gap-12'>

        {/* left */}
        <div className='flex md:flex-1 flex-col gap-7.5'>
            <h1 className='text-5xl font-bold '>
                Manage agents. Assign tasks. Stay in control.
            </h1>
            <p className='text-xl text-neutral-700/70 '>Assignly is the modern way to orchestrate your team. Upload your CSV, distribute tasks fairly, and track progress with confidence.</p>
            
            {/* CTA buttons */}
            <h1 className='flex items-center gap-7'>
                <Link to={"/signup"} className='px-5 py-2 bg-blue-700 text-white font-medium rounded-xl flex gap-2 shrink-0 items-center hover:bg-blue-800/90 cursor-pointer'>Get Started
                    <span><FiLogIn/></span>
                </Link>

                <Link to={"/login"} className='px-5 py-2 font-medium rounded-xl flex shrink-0 items-center hover:bg-black hover:text-white border border-neutral-200 cursor-pointer'>Login
                </Link>
            </h1>

            {/* Features */}

            <div className='flex flex-1 flex-row items-center gap-5'>
                <span className='flex items-center gap-3 rounded-xl border border-neutral-200 px-5 py-2.5 shadow hover:scale-[1.02] overflow-hidden hover:bg-neutral-200 shrink-0'>
                <BsPeopleFill className=' bg-purple-300 rounded-2xl p-1 text-2xl'/>
                Add Agents
            </span>

            <span className='flex items-center gap-3 rounded-xl border border-neutral-200 px-5 py-2.5 shadow hover:scale-[1.02] overflow-hidden hover:bg-neutral-200 shrink-0'>
                <LuUpload className=' bg-purple-300 rounded-2xl p-1 text-2xl'/>
                Upload CSV
            </span>
            <span className='flex items-center gap-3 rounded-xl border border-neutral-200 px-5 py-2.5 hover:shadow-2xs hover:scale-[1.02] overflow-hidden hover:bg-neutral-200 shrink-0'>
                <TbArrowsSplit className=' bg-purple-300 rounded-2xl p-1 text-2xl'/>
                Distribute Tasks
            </span>

            
            </div>

        </div>

        {/* right */}
        <div className='flex-1 flex items-center justify-center h-[17rem]'>
            <Demo/>
        </div>

    </main>
  )
}

export default Main