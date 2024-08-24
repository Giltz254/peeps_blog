import React from 'react'
import Breadcrumb from './BreadCrumb'

const Header = () => {
  return (
    <div className='flex items-center h-16 border-b border-border w-full sticky top-0 bg-white'>
        <div className='container'>
            <Breadcrumb />
        </div>
    </div>
  )
}

export default Header