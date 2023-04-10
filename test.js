import {VideoCapture} from 'camera-capture'

/* const VideoCapture = require('camera-capture'); */

aaa();

async function aaa(){
const c = new VideoCapture()
c.addFrameListener(frame => {  
  // frame by default is unencoded raw Image Data `{width: 480, height: 320, data: UIntArray}``
  // which is often what image processing / surfaces interfaces expect for fast processing. 
  // Use `mime` option to receive it in other formats (see examples below)
  surface.putImageData(0,0,frame.width, frame.height, frame.data)
})
// pause / resume frame emission (without tunning off the camera)
setTimeout(()=>c.pause(), 1000)
setTimeout(()=>c.resume(), 2000)
// shutdown everything, including, camera, browser, server:
setTimeout(()=>c.stop(), 3000)
console.log('Capturing camera');
await c.start() // promise will be resolved only when `stop`
console.log('Stopping camera capture');
}


async function SSS(){
const c = new VideoCapture({
  mime: 'image/png'
})
await c.initialize()
let f = await c.readFrame()               // PNG as configured
writeFileSync('C:\Users\kozyrevnv\Documents\test\tmp.png', f.data)
f = await c.readFrame('image/webp')       // take another shot this time as webp image
writeFileSync('tmp.webp', f.data)
f = await c.readFrame('image/jpeg') // jpeg
writeFileSync('tmp.jpg', f.data)
f = await c.readFrame('rgba')       // raw image data (as default)
writeFileSync('tmp-8bit-200x200.rgba', f.data)
}