import { useRef, useState } from 'react';
import './App.css';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css' 
import { image64toCanvasRef } from './services/image64toCanvasRef';
import Product from './components/Product/Product';

function App() {

  const [previewImage,setPreviewImage]=useState(null)
  const [cropImage,setCropImage]=useState()
  const [crop,setCrop]=useState({aspect:16/1,width:400,height:300,unit:'px'})
  const [name,setName]=useState('')
  const [price,setPrice]=useState('')
  const [description,setDescription]=useState('')
  const [products,setProducts]=useState([])
  const [error,setError]=useState(false)

  const previewImageRef=useRef()
  
  function handleOnCropComplete(crop){
    const imgRef= previewImageRef.current
    const imgSrc= previewImage
    setCropImage(JSON.stringify(crop))
    image64toCanvasRef(imgRef,imgSrc,crop)
  }

  function handleFile(e){
    const value=e.target.value

    const valueArray=value.split('.')

    const extension=valueArray[valueArray.length-1]

    if(extension !== 'png' && extension !== 'jpg' && extension !== 'jpeg'){
      return
    }

    setPreviewImage(e.target.files[0])
  }

  function handleName(e){
    const value=e.target.value

    if(value.length >= 25){
      return
    }

    setName(value)
  }

  function handlePrice(e){
    const value=e.target.value

    if(value.length >= 25){
      return
    }

    setPrice(value)
  }

  function handleDescription(e){
    const value=e.target.value

    if(value.length >= 1351){
    
      return
    }

    setDescription(value)
  }

  function handleSubmit(e){
    e.preventDefault()

    if(!name || !price || !description || !previewImage || !cropImage){
      setError(true)
      setTimeout(()=>{
        setError(false)
      },3000)
      return
    }

    const newProduct={
      name,
      price,
      description,
      image:{
        img:previewImage,
        crop:cropImage
      }
    }

    setProducts([...products,newProduct])

    setName('')
    setPrice('')
    setDescription('')
    setPreviewImage('')
    setCropImage({})
  }


  return (
    <div className="App">
      <div className='createProduct'>
        <div className='product'>
          {!previewImage && <img className='notFound' src="https://images.unsplash.com/photo-1609743522653-52354461eb27?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="name" />}
          {previewImage && <canvas ref={previewImageRef} alt="name" />}
          <h2>{name}</h2>
          {price && <p className='price'>R$ {price}</p>}
          <p className='description'>{description}</p>  
        </div>
        <div className='formDiv'>
          <div className='box'>
            {previewImage && <ReactCrop locked={true} ruleOfThirds={true} crop={crop} onChange={(e)=>setCrop(e)} onComplete={handleOnCropComplete}>
              <img className='image' src={URL.createObjectURL(previewImage)} alt="" />
            </ReactCrop>}
          </div>
          {error && <p className='error'>Informações incompletas</p>}
          <form className='form' onSubmit={handleSubmit}>
            <label className='file'>
              <span>Adicionar foto</span>
              <input type='file' onChange={handleFile}/>
            </label>
            <label className='label'>
              <span>Nome:</span>
              <input type='text' value={name} placeholder='Digite o nome do produto' onChange={handleName} />
            </label>
            <label className='label'>
              <span>Preço:</span>
              <input type='number' value={price} placeholder='Digite o preço do produto' onChange={handlePrice}/>
            </label>
            <label className='label'>
              <span>Descrição:</span>
              <textarea value={description} placeholder='Digite a descrição do produto' onChange={handleDescription}/>
            </label>
            <input type='submit' value='Criar'/>
          </form>
        </div>
      </div>
      <div className='products'>
        {products.map(product => <Product product={product}/>)}
      </div>
    </div>
  );
}

export default App;
