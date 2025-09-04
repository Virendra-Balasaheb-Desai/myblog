import React from 'react'

const Container = ({children}) => {
  return  <div className='w-full max-w-7xl mx-auto p-4 min-h-[inherit]'>
        {children}
    </div>;
}

export default Container
