# Sketchify 

Welcome to **Sketchify** – a collaborative real-time whiteboard for seamless sketching, and idea sharing. 

## Features

- **Real-time Collaboration** – Instantly sync drawings and sketches with multiple users.
- **Authentication & Authorization** – Secure login and access control using NextAuth.js.
- **Room-based Whiteboards** – Join existing rooms with a Room ID or create your own.
- **WebSocket-powered Communication** – Ensures low-latency updates between users.
- **Modern UI/UX** – Clean, intuitive interface with smooth transitions and interactions.

## Tech Stack

###  Frontend
- **Next.js** – Server-side rendering and optimized frontend performance.
- **React** – Component-based UI development.
- **Tailwind CSS** – Modern UI components and sleek styling.

###  Backend
- **Node.js & Express** – Handles API requests efficiently.
- **Prisma** – ORM for interacting with the database.
- **NeonDB (PostgreSQL)** – Reliable and scalable database solution.
- **WebSockets (Socket.io)** – Enables real-time updates and user interactions.

###  Tools 
- **pnpm** – Faster and efficient package management.

##  Getting Started

### 1️⃣ Clone the Repository
```sh
 git clone https://github.com/amulyaa-19/Sketchify.git
 cd Sketchify
```

### 2️⃣ Install Dependencies
```sh
pnpm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file and configure the necessary credentials such as:
```env
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret_key
...
```

### 4️⃣ Run the Development Server
```sh
pnpm dev
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

##  Contribution
   Feel free to contribute! Open an issue, suggest a feature, or submit a pull request.

