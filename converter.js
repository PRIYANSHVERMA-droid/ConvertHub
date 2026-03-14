const ffmpeg = require("fluent-ffmpeg")
const path = require("path")

/* FIX FOR PACKAGED APP */

const ffmpegPath =
process.resourcesPath
? path.join(process.resourcesPath,"engines","ffmpeg.exe")
: path.join(__dirname,"engines","ffmpeg.exe")

ffmpeg.setFfmpegPath(ffmpegPath)

function convertFile(input, output, progressCallback){

return new Promise((resolve,reject)=>{

ffmpeg(input)

.outputOptions("-qscale:v 2")

.output(output)

.on("start",(cmd)=>{
console.log("FFmpeg started:",cmd)
})

.on("progress",(progress)=>{

if(progress.percent){
progressCallback(Math.round(progress.percent))
}

})

.on("end",()=>{
console.log("Conversion finished")
resolve()
})

.on("error",(err)=>{
console.error("FFmpeg error:",err)
reject(err)
})

.run()

})

}

module.exports = { convertFile }