
  # ⚡ ConvertHub

  
![License](https://img.shields.io/badge/license-MIT-blue)
![Platform](https://img.shields.io/badge/platform-Windows-blue)
![Version](https://img.shields.io/badge/version-1.0-green)
![Built With](https://img.shields.io/badge/built%20with-Electron-purple)

**ConvertHub** is a universal desktop file converter that supports audio, video, image, document, and archive conversions in a single modern application.

It integrates powerful tools like **FFmpeg**, **LibreOffice**, and **7-Zip** to handle a wide range of file formats without requiring users to install additional software.

---

# 🖥 Preview

![ConvertHub Interface](https://raw.githubusercontent.com/PRIYANSHVERMA-droid/ConvertHub/main/screenshots/main-ui.png)

![ConvertHub Sidebar](https://raw.githubusercontent.com/PRIYANSHVERMA-droid/ConvertHub/main/screenshots/sidebar.png)

---

# 🚀 Features

• Convert **audio formats** (MP3, WAV, AAC, FLAC)  
• Convert **video formats** (MP4, MKV, MOV, AVI)  
• Convert **image formats** (JPG, PNG, WEBP)  
• Convert **documents** using LibreOffice engine  
• Convert **archives** using 7-Zip engine  
• Clean and modern desktop UI  
• Built-in conversion engines (no additional installation required)  
• Simple and user-friendly interface  

---

# 📂 Supported Formats

### 🎵 Audio
MP3, WAV, AAC, FLAC

### 🎬 Video
MP4, MKV, MOV, AVI

### 🖼 Images
JPG, PNG, WEBP

### 📄 Documents
PDF, DOCX, ODT

### 📦 Archives
ZIP, 7Z, RAR

---

# 🛠 Tech Stack

ConvertHub is built using the following technologies:

- **Electron** – Desktop application framework  
- **Node.js** – Backend runtime environment  
- **FFmpeg** – Audio and video conversion engine  
- **LibreOffice** – Document conversion engine  
- **7-Zip** – Archive compression and extraction engine  

---

# 📦 Installation

1. Go to the **Releases** section of this repository.
2. Download the latest installer.
3. Run the installer and follow the setup instructions.

👉 Download here:

**https://github.com/PRIYANSHVERMA-droid/ConvertHub/releases**

---

# 📁 Project Structure

```
ConvertHub
│
├ build
│   └ icon.ico
│
├ engines
│   ├ 7zip
│   │   ├ 7za.exe
│   │   └ 7za.dll
│   │
│   └ libreoffice
│       ├ program
│       ├ presets
│       ├ share
│       └ URE
│
├ scripts
│   └ ui.js
│
├ styles
│   └ style.css
│
├ app.html
├ converter.js
├ main.js
├ package.json
├ package-lock.json
│
├ README.md
├ LICENSE
└ .gitignore
```

---

# 🔮 Future Improvements

Planned improvements for future versions:

• GPU accelerated video encoding  
• Batch file conversion  
• Conversion presets  
• Conversion progress tracking  
• Performance optimizations  
• Cross-platform support (Linux / macOS)

---

# 🤝 Contributing

Contributions are welcome.

If you would like to improve ConvertHub:

1. Fork the repository  
2. Create a new branch  
3. Submit a pull request  

---

# 📜 License

This project is licensed under the **MIT License**.

See the **LICENSE** file for details.
