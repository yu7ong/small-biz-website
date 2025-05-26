import React from 'react'
import {Link} from 'react-router-dom'

const ProductItem = ({id, image, name, price}) => {

  return (
    <Link className='text-[#38342c] cursor-pointer' to={`/product/${id}`}>
        <div className='overflow-hidden'> 
            <img className='hover:scale-110 transition ease-int-out' src={image[0]} alt=" " /> 
        </div>
        <p className='text-[#38342c] gaegu pt-3 pb-1 text-sm'> {name}</p>
        <p className='text-[#38342c] gaegu text-sm font-medium '> {'$'}{price}</p>

    </Link>
  )
}

export default ProductItem
