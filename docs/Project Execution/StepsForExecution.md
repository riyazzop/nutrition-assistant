# Steps For Execution

This guide details how to set up, configure, and run the Nutrition Assistant application locally.

---

## Step 1: Set Up the Backend Server

1. Open a terminal and navigate into the `server` folder:
   ```bash
   cd server
   ```

2. Install the backend dependencies:
   ```bash
   npm install
   ```

3. Create the environment configuration file:
   Create a new file named `.env` in the `server` root directory and add the following variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/Nutrition_Assistant
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=8000
   ```

4. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend API will start running on [http://localhost:8000](http://localhost:8000).

---

## Step 2: Set Up the Frontend Client

1. Open a new terminal window/tab and navigate into the `client` folder:
   ```bash
   cd client
   ```

2. Install the frontend dependencies:
   ```bash
   npm install
   ```

3. Start the client development server:
   ```bash
   npm run dev
   ```
   The React frontend will compile and start running on [http://localhost:3000](http://localhost:3000).
