import React from 'react'; // ✅ Needed if you're using React.createElement or older JSX transforms
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // or your main stylesheet

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
