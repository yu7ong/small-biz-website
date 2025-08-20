# My Small Business Website Project

## Demo Video
[Watch the demo video](https://drive.google.com/file/d/1J9MrqHyCQdeeoIX_HaH3lClofBSea98w/view?usp=sharing)

---

## Problem Statement

This is a passion project combining my love for art and technology.  

I run a small business selling at physical art markets. While events drive sales, they also bring challenges:  

- Hard to predict demand  
- Leftover stock after markets 

---

## Features Overview

To support this goal, I built a few core features:

- **Product Browsing Page:** Users can view product variants easily.  
- **Persistent Cart:** Stores selections even after page refresh.  
- **Checkout System:** PayNow integration with email confirmations.  
- **Seller Logic:** I can add or remove products directly from the system.  

---

## Takeaways

**Frontend:**  
I learned how to build responsive layouts that work well across different screen sizes, including a collapsible menu for mobile. I focused on user experience, for example, since the PayNow payment flow is less familiar to users, I included clear step-by-step instructions.  

**Backend:**  
I worked with RESTful APIs and used ER diagrams to [model relationships](https://drive.google.com/file/d/1u55XhxZ4kb-aTdY9PFMc8OsJf6kPx8-F/view?usp=sharing) between products, carts, and orders. I explored embedding vs referencing in MongoDB and thought critically about how data structure affects business logic.

**Trade-offs and Reflections:**  
I simplified the project by removing login and admin features, tailored to my needs as a one-person team. I chose PayNow QR over Stripe to avoid fees. Stock updates are currently manual, but I plan to implement a reservation system to prevent over-ordering.  

Overall, this project taught me how to think beyond tutorials and prioritize features based on real constraints.  

---

## Next Steps

**Business Development:**  
- Work on product development and marketing strategies.  
- Increase social media presence and engagement.  

**Technical Development:**  
- Implement stock update feature and deploy the website.  
- Analyze session and order data to see which pages and products are most popular.  
- Explore building a simple recommender system using K-means clustering to suggest products based on customer behavior.  
- Implement additional payment methods to support overseas customers as the business grows.  

---

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
Sign up/sign in to these services and get the API keys
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- [Cloudinary](https://cloudinary.com/)

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
