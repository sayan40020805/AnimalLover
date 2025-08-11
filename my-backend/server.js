// server.js
import dotenv from 'dotenv';
import http from 'http';
import app from './app.js';

// ✅ Load environment variables
dotenv.config();

// ✅ Set port from .env or fallback to 5000
const PORT = process.env.PORT || 5000;

// ✅ Create server
const server = http.createServer(app);

// ✅ Handle server 'error' event
server.on('error', (error) => {
  console.error(`❌ Server error: ${error.message}`);
  process.exit(1); // Exit if the server fails to start
});

// ✅ Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
