## Project Structure
```plaintext
root/
├── package.json         # Frontend config
├── backend/
│   ├── package.json     # Backend config
│   └── .env.example     # Environment variables template
```

## Getting Started 
Clone repo: 
```bash
git clone https://github.com/yu7ong/small-biz-website.git
```
Install dependencies in both the root and backend: 
```bash
npm install
```

```bash
cd backend
npm install
```

## Setup Environment Variables
Copy the .env.example file inside the backend folder and rename it to .env. Then, fill in the required values.

## Services to set up
- MongoDB Atlas
- Cloudinary

## Running the app 
You need to run both the frontend and the backend in separate terminals:
#### Frontend: 
At root: 
```bash
npm run dev
```
#### Backend 
```bash
cd backend
npm run server
```
⚠️The backend is now set to run on: http://localhost:4000 
