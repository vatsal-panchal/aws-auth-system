# AWS Auth System (TypeScript + Express + MongoDB)

Simple AWS-style authentication system built with Node.js, Express, TypeScript, and MongoDB.

## Setup & Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Check `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aws-auth-system
JWT_SECRET=aws-super-secret-key-change-this-in-production
JWT_EXPIRES_IN=7d
```

Make sure MongoDB local service is running.

### 3. Start Development Server
```bash
npm run dev
```

### 4. Build & Production Run
```bash
npm run build
npm start
```

## API Endpoints

### 1. Register IAM User
- **POST** `/api/auth/register`
- **Body**:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "mySecurePassword123"
}
```
- **Response**: Generates `accessKeyId` (AKIA...) and ARN.

### 2. Login (Get Session Token)
- **POST** `/api/auth/login`
- **Body**:
```json
{
  "accessKeyId": "AKIA...",
  "secretAccessKey": "mySecurePassword123"
}
```
- **Response**: Returns JWT `sessionToken`.

### 3. Get Caller Identity (Protected / STS Style)
- **GET** `/api/auth/sts/caller-identity`
- **Headers**:
```http
Authorization: Bearer <sessionToken>
```
