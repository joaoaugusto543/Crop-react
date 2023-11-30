import { useEffect, useRef } from 'react'
import { image64toCanvasRef } from '../../services/image64toCanvasRef'

function Product({product}) {

  const previewImageRef=useRef()

  useEffect(()=>{

    const imgRef=previewImageRef.current

    const {img,crop}=product.image

    const cropObject=JSON.parse(crop)

    image64toCanvasRef(imgRef,img,cropObject)

  },[product.image])

  return (
    <div className='product'>
        <canvas ref={previewImageRef} alt="name" />
        <h2>{product.name}</h2>
        <p className='price'>R$ {product.price}</p>
        <p className='description'>{product.description}</p>  
    </div>
  )
}

export default Product