// server.js
import dotenv from 'dotenv';
import http from 'http';
import app from './app.js';

// ✅ Load environment variables
dotenv.config();

// ✅ Set port from .env or fallback to 5000
const PORT = process.env.PORT || 5000;

// ✅ Create and start server
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
