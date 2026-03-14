const { ipcRenderer } = require("electron")

/* SPLASH SCREEN */

window.addEventListener("DOMContentLoaded",()=>{

const splash=document.getElementById("splash-screen")
const main=document.getElementById("main-app")
const status=document.getElementById("engine-status")

if(!splash || !main) return

main.style.display="none"

setTimeout(()=>{

status.innerText="Loading FFmpeg ✔"

setTimeout(()=>{

status.innerText="Loading LibreOffice ✔"

setTimeout(()=>{

status.innerText="Loading 7-Zip ✔"

setTimeout(()=>{

splash.style.display="none"
main.style.display="block"

},500)

},500)

},500)

},500)

})

let selectedFiles = []
let currentCategory = "audio"

/* UI ELEMENTS */

const uploadZone = document.getElementById("upload-btn")
const fileList = document.getElementById("file-list")
const formatSelect = document.getElementById("format-select")
const convertBtn = document.getElementById("convert-btn")
const summary = document.getElementById("file-summary")

/* WINDOW CONTROLS */

const minimizeBtn = document.getElementById("minimize")
const maximizeBtn = document.getElementById("maximize")
const closeBtn = document.getElementById("close")

minimizeBtn.addEventListener("click",()=>{
ipcRenderer.send("minimize")
})

maximizeBtn.addEventListener("click",()=>{
ipcRenderer.send("maximize")
})

closeBtn.addEventListener("click",()=>{
ipcRenderer.send("close")
})

/* QUALITY PRESETS */

const presets = {
"Original": {},
"High Quality": { quality: "high" },
"Small Size": { quality: "small" },
"4K": { resolution: "2160" },
"1080p": { resolution: "1080" },
"720p": { resolution: "720" },
"480p": { resolution: "480" },
"Extract Audio": { audio: true }
}

/* FORMAT OPTIONS */

const formats = {

audio:[
"mp3","wav","aac","flac","ogg","m4a","wma","opus","aiff","alac"
],

video:[
"mp4","mkv","avi","mov","webm","flv","wmv","m4v","mpg","mpeg","ts","3gp"
],

images:[
"jpg","jpeg","png","webp","bmp","tiff","gif","ico","heic"
],

documents:[
"pdf","doc","docx","odt","rtf","txt","html","ppt","pptx","xls","xlsx","ods"
],

archive:[
"zip","7z","rar","tar","gz","bz2"
]

}

/* SIDEBAR SWITCH */

document.querySelectorAll(".tool").forEach(btn=>{

btn.addEventListener("click",()=>{

document.querySelectorAll(".tool").forEach(b=>b.classList.remove("active"))
btn.classList.add("active")

currentCategory = btn.dataset.type

loadFormats()

})

})

/* LOAD FORMAT OPTIONS */

function loadFormats(){

formatSelect.innerHTML=""

formats[currentCategory].forEach(f=>{

const opt = document.createElement("option")
opt.value = f
opt.innerText = f.toUpperCase()

formatSelect.appendChild(opt)

})

}

loadFormats()

/* FILE PICKER */

uploadZone.addEventListener("click", async ()=>{

const files = await ipcRenderer.invoke("select-files")

if(!files || files.length === 0) return

files.forEach(path=>{

selectedFiles.push({
path:path,
name:path.split("\\").pop(),
status:"waiting"
})

})

renderFiles()
updateSummary()

})

/* REMOVE FILE */

function removeFile(index){

selectedFiles.splice(index,1)

renderFiles()
updateSummary()

}

/* RENDER FILE LIST */

function renderFiles(){

fileList.innerHTML=""

selectedFiles.forEach((file,index)=>{

const div=document.createElement("div")
div.className="file-card"

div.innerHTML=`
<span class="file-name">${file.name}</span>
<span class="file-status" id="status-${index}">${file.status}</span>
<button class="remove-btn">✕</button>
`

div.querySelector(".remove-btn").onclick=()=>removeFile(index)

fileList.appendChild(div)

})

}

/* UPDATE STATUS */

function updateStatus(index,status){

selectedFiles[index].status = status

const el=document.getElementById(`status-${index}`)
if(el) el.innerText=status

}

/* FILE SUMMARY */

function updateSummary(){

summary.innerText = `${selectedFiles.length} files selected`

}

/* START CONVERSION */

convertBtn.addEventListener("click", async ()=>{

if(selectedFiles.length === 0) return

const format = formatSelect.value

const filePaths = selectedFiles.map(f=>f.path)

try{

for(let i=0;i<selectedFiles.length;i++){
updateStatus(i,"converting")
}

await ipcRenderer.invoke("convert-files",{
files:filePaths,
format:format
})

for(let i=0;i<selectedFiles.length;i++){
updateStatus(i,"done")
}

}catch(err){

console.error(err)

selectedFiles.forEach((_,i)=>updateStatus(i,"error"))

}

})