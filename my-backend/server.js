// server.js
import http from 'http';
import dotenv from 'dotenv';
import app from './app.js';

// Load environment variables
dotenv.config();

// Set port
const PORT = process.env.PORT || 5000;

// Create and start server
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
