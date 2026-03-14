const { app, BrowserWindow, ipcMain, Menu, dialog, shell } = require("electron")
const path = require("path")
const { exec } = require("child_process")
const { convertFile } = require("./converter")

let win

function createWindow(){

win = new BrowserWindow({

width:1200,
height:800,
frame:false,

icon:path.join(__dirname,"build","icon.ico"),

webPreferences:{
nodeIntegration:true,
contextIsolation:false,
webSecurity:false
}

})

Menu.setApplicationMenu(null)

win.loadFile("app.html")

}

app.whenReady().then(createWindow)

app.on("window-all-closed",()=>{
if(process.platform!=="darwin"){
app.quit()
}
})

/* WINDOW CONTROLS */

ipcMain.on("minimize",()=>win.minimize())

ipcMain.on("maximize",()=>{
if(win.isMaximized()){
win.unmaximize()
}else{
win.maximize()
}
})

ipcMain.on("close",()=>win.close())

/* FILE PICKER */

ipcMain.handle("select-files", async ()=>{

const result = await dialog.showOpenDialog(win,{
properties:["openFile","multiSelections"]
})

if(result.canceled) return []

return result.filePaths

})

/* DOCUMENT ENGINE */

function convertDocument(input,output){

return new Promise((resolve,reject)=>{

const outDir = path.dirname(output)

/* FIX FOR PACKAGED APP */

const sofficePath =
process.resourcesPath
? path.join(process.resourcesPath,"engines","libreoffice","program","soffice.exe")
: path.join(__dirname,"engines","libreoffice","program","soffice.exe")

const format = path.extname(output).slice(1)

const cmd = `"${sofficePath}" --headless --convert-to ${format} "${input}" --outdir "${outDir}"`

exec(cmd,(error)=>{

if(error){
reject(error)
}else{
resolve()
}

})

})

}

/* ARCHIVE ENGINE */

function convertArchive(input, output){

return new Promise((resolve,reject)=>{

/* FIX FOR PACKAGED APP */

const sevenZip =
process.resourcesPath
? path.join(process.resourcesPath,"engines","7zip","7za.exe")
: path.join(__dirname,"engines","7zip","7za.exe")

const cmd = `"${sevenZip}" a "${output}" "${input}"`

console.log("7zip command:",cmd)

exec(cmd,(err)=>{

if(err){
reject(err)
}else{
resolve()
}

})

})
}

/* MAIN CONVERSION ROUTER */

ipcMain.handle("convert-files", async (event, data) => {

const { files, format } = data

for (let i = 0; i < files.length; i++) {

const file = files[i]

try {

const name = path.basename(file, path.extname(file))

const save = await dialog.showSaveDialog(win, {
defaultPath: `${name}.${format}`
})

if (save.canceled) continue

let output = save.filePath

if (!output.endsWith("." + format)) {
output += "." + format
}

console.log("Input:", file)
console.log("Output:", output)

const ext = path.extname(file).toLowerCase()

/* DOCUMENTS */

if ([".pdf",".docx",".doc",".txt"].includes(ext)) {

await convertDocument(file, output)

}

/* ARCHIVES */

else if ([".zip",".rar",".7z",".tar"].includes(ext)) {

await convertArchive(file, output)

}

/* MEDIA */

else {

await convertFile(file, output, (percent) => {

win.webContents.send("conversion-progress", {
index: i,
percent: percent
})

})

}

shell.showItemInFolder(output)

} catch (err) {

console.error("Conversion error:", err)

win.webContents.send("conversion-error", {
index: i,
error: err.message
})

}

}

})