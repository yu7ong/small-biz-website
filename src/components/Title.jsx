import React from 'react'

const Title = ({text1, text2}) => {
  return (
    <div className='inline-flex gap-2 items-centre mb-3'>
      <p className='sigmar-one text-[#38342c]'> {text1} <span className='sigmar-one text-[#adaba6]'> {text2} </span></p>
        <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-[#adaba6]'></p>
    </div>
  )
}

export default Title
