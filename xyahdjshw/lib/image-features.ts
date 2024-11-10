export async function getImageFeatures(file: File) {
  return new Promise((resolve) => {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      
      if (ctx) {
        ctx.drawImage(img, 0, 0)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const features = analyzeImageData(imageData)
        URL.revokeObjectURL(img.src)
        resolve(features)
      }
    }

    img.src = URL.createObjectURL(file)
  })
}

function analyzeImageData(imageData: ImageData) {
  const data = imageData.data
  let totalGreen = 0
  let totalBrightness = 0
  let colorVariation = 0
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    
    totalGreen += g - Math.max(r, b)
    totalBrightness += (r + g + b) / 3
    
    if (i > 0) {
      const prevR = data[i - 4]
      const prevG = data[i - 3]
      const prevB = data[i - 2]
      colorVariation += Math.abs(r - prevR) + Math.abs(g - prevG) + Math.abs(b - prevB)
    }
  }

  const pixels = data.length / 4
  
  return {
    greenness: totalGreen / pixels,
    brightness: totalBrightness / pixels,
    variation: colorVariation / pixels
  }
}