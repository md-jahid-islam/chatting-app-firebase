import Lottie from 'lottie-react'
import React from 'react'
import NotFount from '../../public/animations/NotFound - 1719920424709.json'

function NotFound() {
  return (
  <>
  
      <div className=' w-[450px] h-[550px] flex m-auto'>
      <Lottie animationData = {NotFount}/>
      </div>
  
  </>
  )
}

export default NotFound