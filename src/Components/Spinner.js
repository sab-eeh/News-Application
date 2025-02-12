import React from 'react'
import Loader from './Loader.gif'

export const Spinner = () => {
  return (
    <div className='text-center'>
      <img className='my-3' src={Loader} alt="" />
    </div>
  )
}
export default Spinner;