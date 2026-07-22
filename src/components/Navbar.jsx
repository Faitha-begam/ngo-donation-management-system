import React from 'react'

const Navbar = () => {
  return (
    <>
      <div className='flex justify-between p-5 bg-[#66785F] text-white'>
        <div>
            logo
        </div>
        <div className='flex gap-9'>
            <a href="home">Home</a>
            <a href="campaigns">Campaigns</a>
            <a href="donate">Donate</a>
            <a href="admin">Admin</a>
            <a href="reports">Reports</a>
            <button className='bg-[#FDF6ED] text-black p-1 rounded-lg'>Donate Now</button>
        </div>
      </div>
    </>
  )
}

export default Navbar
