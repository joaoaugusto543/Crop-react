export function image64toCanvasRef (canvasRef, image64, pixelCrop) {
    const canvas = canvasRef // document.createElement('canvas');
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height 
    const ctx = canvas.getContext('2d')
    const image = new Image()
    image.src = URL.createObjectURL(image64)
    image.onload = function () {
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width ,
        pixelCrop.height
      )
    }
  }