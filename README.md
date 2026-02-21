# 🎙️ Neurovive  

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express.js-Backend-black)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)
![License](https://img.shields.io/badge/License-ISC-blue)

Neurovive is a serverless backend API built with Node.js and Express.js that handles audio file uploads and processes them for further analysis or AI integrations.

The backend is deployed using Vercel, enabling scalable and efficient serverless hosting.

---

## 🚀 Live Deployment

🌍 **Base URL:**  
https://neurovive.vercel.app/

---

## 📌 Overview

Neurovive provides a REST API endpoint that:

- Accepts audio file uploads
- Validates file formats
- Processes audio files
- Integrates with external services (AI, APIs)
- Runs on scalable serverless infrastructure (Vercel)

This project demonstrates:

- Backend architecture organization
- File upload handling with Multer
- Clean controller/service separation
- Serverless deployment using Vercel

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- Multer
- Axios
- Dotenv
- Vercel (Serverless Deployment)

---

## 🏗️ Architecture

Client (Postman / Frontend)  
↓  
Express Route (/voice)  
↓  
Middleware (Multer - File Validation)  
↓  
Controller  
↓  
Service Layer  
↓  
Response  

---

## ☁️ Serverless Deployment (Vercel)

Neurovive is deployed using Vercel as a serverless backend platform.

### Deployment Steps:

1. Push project to GitHub.
2. Import repository into Vercel.
3. Configure build settings.
4. Add environment variables in Vercel dashboard.
5. Automatic deployment via CI/CD.

## 📦 Local Installation

Follow these steps to run Neurovive on your local machine.

### 1️⃣ Clone the repository

```bash
git clone https://github.com/mhmdmetwally/neurovive.git
cd neurovive

### 2️⃣ Install Dependencies

After cloning the repository, install all required packages:

```bash
npm install

