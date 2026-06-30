# 🌍 VoyageAI – AI Travel Planner & Itinerary Generator

VoyageAI is an AI-powered travel assistant that helps users discover destinations, chat with an intelligent travel guide, and generate personalized travel itineraries.

The application combines React, Vite, OpenAI, and Vercel Serverless Functions to provide a fast, responsive, and secure travel planning experience.

Have a look at the webapp 
https://tourism-bot-ai-ebon.vercel.app/
---

## ✨ Features

### 🧭 Explore Destinations
- Browse curated travel destinations
- Discover popular attractions
- Get travel inspiration
- Quickly start itinerary planning

### 🤖 AI Travel Guide
- Chat with an AI travel assistant
- Ask destination-specific questions
- Get restaurant recommendations
- Learn local customs and etiquette
- Receive travel tips and suggestions

### 🗺️ AI Itinerary Builder
Generate personalized travel plans based on:
- Destination
- Trip duration
- Budget
- Travel interests
- Personal preferences

The AI generates:
- Day-by-day itinerary
- Daily themes
- Suggested activities
- Recommended timings

### 💾 Saved Trips
- Save generated itineraries
- View previously created trips
- Print itineraries
- Manage travel plans

---

## 🛠️ Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Lucide React

### Backend
- Vercel Serverless Functions
- OpenAI API

### Deployment
- Vercel

---

## 📂 Project Structure

```
tourismaibot
│
├── api/
│   ├── openai.js
│   └── itinerary.js
│
├── src/
│   ├── components/
│   ├── App.tsx
│   └── main.tsx
│
├── public/
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/RashneemaAmeen/tourismBot-AI

cd tourismaibot
```

### Install Dependencies

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root.

```env
OPENAI_API_KEY=your_openai_api_key
```

> Never commit your `.env` file to GitHub.

---

## ▶️ Running Locally

For Vercel Serverless Functions:

```bash
vercel dev
```

Alternatively:

```bash
npm run dev
```

> Note: Serverless API routes require the Vercel development environment.

---

## 📦 Build

```bash
npm run build
```

---

## 🌐 Deployment

This application is designed for deployment on Vercel.

1. Push the project to GitHub
2. Import the repository into Vercel
3. Add the environment variable:

```
OPENAI_API_KEY
```

4. Deploy

---

## 🔒 Security

The OpenAI API key is never exposed to the client.

All AI requests are processed securely through Vercel Serverless Functions.

Sensitive files excluded from GitHub include:

```
.env
.env.local
dist/
node_modules/
.vercel/
```

---


## 🔮 Future Enhancements

- Flight recommendations
- Hotel search
- Weather forecasts
- Interactive maps
- Currency converter
- Travel expense tracker
- PDF itinerary export
- Authentication
- Multi-language support

---



