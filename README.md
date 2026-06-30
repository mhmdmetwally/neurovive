# NeuroVive Backend API 🧠

NeuroVive is an AI-powered medical analysis backend system that enables patients to upload handwriting images and voice recordings for intelligent analysis using external AI services.

The backend provides secure authentication, cloud file storage, AI model integration, and patient history management.

---

# 🚀 Features

## 🔐 Authentication & Users

- Patient registration.
- Patient login.
- Password hashing using bcrypt.
- JWT-based authentication.
- Guest users can use AI analysis without storing history.
- Secure user session management.

---

# ✍️ Handwriting Analysis

The system supports handwriting analysis by:

- Uploading handwriting images.
- Validating uploaded image files.
- Sending images to an AI prediction service.
- Receiving AI prediction results.
- Uploading images to Cloudinary.
- Saving test history for authenticated patients.

---

# 🎤 Voice Analysis

The system supports voice analysis by:

- Uploading voice recordings.
- Validating audio file types.
- Sending audio files to AI services.
- Receiving prediction results.
- Uploading audio files to Cloudinary.
- Saving voice test history.

---

# ☁️ Cloud Storage

The system uses Cloudinary for file management.

Cloudinary provides:

- Image storage.
- Audio storage.
- CDN delivery.
- Secure public URLs.

The database stores only the file URL instead of storing binary data.

---

# 📋 Patient History

Each patient can have multiple analysis records.

Each record contains:

- Test date.
- Test type.
- Data type.
- AI result probability.
- Uploaded file URL.

Example:

```
Patient

|
|-- user_name
|
|-- password
|
|-- token
|
|-- patient_history[]
        |
        |-- date_of_test
        |
        |-- test_type
        |
        |-- data_type
        |
        |-- test_result
        |
        |-- url
```

---

# 🏗️ System Architecture


```
                         Client
                           |
                           |
                     Express API
                           |
        ------------------------------------
        |                 |                |
 Authentication     File Upload      AI Services
        |                 |                |
        |                 |                |
     MongoDB         Cloudinary        ML Models

```

---

# 🔄 Request Flow


## Image Analysis Flow


```
Client

  |
  |
Upload Image

  |
  |
Multer Middleware

  |
  |
Image Controller

  |
  |
Image AI Service

  |
  |
AI Server

  |
  |
Prediction Result

  |
  |
Cloudinary Upload

  |
  |
MongoDB History Update

  |
  |
Response

```


---

## Voice Analysis Flow


```
Client

  |
  |
Upload Audio

  |
  |
Multer Middleware

  |
  |
Voice Controller

  |
  |
Voice AI Service

  |
  |
AI Server

  |
  |
Prediction Result

  |
  |
Cloudinary Upload

  |
  |
MongoDB History Update

  |
  |
Response

```

---

# 🛠️ Technologies Used


## Backend

- Node.js
- Express.js


## Database

- MongoDB
- Mongoose ODM


## Authentication

- JSON Web Token (JWT)
- bcrypt


## File Handling

- Multer


## Cloud Storage

- Cloudinary


## Communication

- Axios
- REST APIs


## Deployment

- Vercel

---

# 📂 Project Structure


```
NeuroVive-Backend

│
├── config
│   └── cloudinary.js
│
├── controllers
│   ├── user.js
│   ├── image_hand_written_controller.js
│   └── voice_controller.js
│
├── middleware
│   ├── image_hand_written.js
│   ├── voice_middleware.js
│   └── verify_token.js
│
├── models
│   └── patient.js
│
├── routes
│   ├── user.js
│   ├── image_hand_written_Routes.js
│   └── voice_Routes.js
│
├── services
│   ├── image_hand_written_ai_server.js
│   ├── voice_ai_server.js
│   └── upload_tocloud.js
│
├── utils
│   └── gen_token.js
│
├── app.js
├── vercel.json
└── package.json

```

---

# ⚙️ Installation


## Clone Repository

```bash
git clone <repository-url>

cd NeuroVive-Backend
```


## Install Dependencies

```bash
npm install
```


## Run Development Server

```bash
npm run dev
```


## Run Production Server

```bash
npm start
```

---

# 🔐 Environment Variables


Create `.env` file in the project root:


```env
PORT=3000


MONGO_URL=your_mongodb_connection_string


JWT_SECRET=your_jwt_secret


salt_rounds=10


CLOUD_NAME=your_cloudinary_name

CLOUD_API_KEY=your_cloudinary_api_key

CLOUD_API_SECRET=your_cloudinary_secret


AI_SERVER_URL_IMAGE_HANDWRITTEN=your_image_ai_server_url

AI_SERVER_URL_VOICE=your_voice_ai_server_url

```

---

# 📡 API Documentation


# Authentication APIs


## Register Patient


### Endpoint

```
POST /user/register
```


### Request Body

```json
{
    "user_name":"Ahmed",
    "password":"Password123!"
}
```


### Response

```json
{
    "status":"success",
    "data":{
        "patient":{},
        "token":"jwt_token"
    }
}
```

---

## Login Patient


### Endpoint

```
POST /user/login
```


### Request Body

```json
{
    "user_name":"Ahmed",
    "password":"Password123!"
}
```


### Response

```json
{
    "status":"success",
    "data":{
        "token":"jwt_token"
    }
}
```

---

# Image Analysis API


## Upload Handwriting Image


### Endpoint

```
POST /image
```


### Headers

```
Authorization: Bearer JWT_TOKEN
```


### Form Data

```
image : image file
```


### Response

```json
{
    "status":"success",
    "label":"positive",
    "probability":0.95
}
```

---

# Voice Analysis API


## Upload Voice Recording


### Endpoint

```
POST /voice
```


### Headers

```
Authorization: Bearer JWT_TOKEN
```


### Form Data

```
voice : audio file
```


### Response

```json
{
    "status":"success",
    "label":"positive",
    "probability":0.91
}
```

---

# 🗄️ Database Design


## Patient Schema


```
Patient

|
|-- _id
|
|-- user_name
|
|-- password
|
|-- token
|
|-- patient_history[]
        |
        |-- date_of_test
        |
        |-- test_type
        |
        |-- data_type
        |
        |-- test_result
        |
        |-- url

```

---

# 🔒 Security Features


Implemented security measures:

- Password hashing using bcrypt.
- JWT authentication.
- Environment variables for sensitive information.
- File type validation.
- File size limitation.
- MongoDB schema validation.
- Protected routes using authentication middleware.

---

# 🧩 Architecture Pattern


The project follows a layered architecture:


```
Routes

   |

Controllers

   |

Services

   |

Database / External APIs

```


## Routes Layer

Responsible for:

- API endpoint definitions.
- Connecting middleware with controllers.


## Controllers Layer

Responsible for:

- Handling HTTP requests.
- Validating requests.
- Returning responses.


## Services Layer

Responsible for:

- AI server communication.
- Cloudinary upload operations.
- Business logic.


## Models Layer

Responsible for:

- Database schemas.
- Data validation.

---

# 🌐 Deployment


The project is configured for Vercel deployment.


`vercel.json`:


```json
{
  "version":2,
  "builds":[
    {
      "src":"app.js",
      "use":"@vercel/node"
    }
  ],
  "routes":[
    {
      "src":"/(.*)",
      "dest":"app.js"
    }
  ]
}

```

---

# 🔮 Future Improvements


- Refresh token authentication.
- Role-based authorization.
- Swagger API documentation.
- Unit testing.
- Integration testing.
- Logging system.
- Rate limiting.
- Docker deployment.
- Separate Patient History collection.
- Image compression before upload.

---

# 👨‍💻 Author

NeuroVive Backend Team
