// API Configuration - Change this IP to your machine's WiFi IP
// For localhost only: const API_HOST = 'http://localhost:5000';
// For LAN play: use your WiFi IP

const hostname = window.location.hostname;
// Try to get from Vite env vars
let API_HOST = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL;

if (!API_HOST) {
  if (hostname.includes('vercel.app')) {
    // If on Vercel and no env var is set, use the Render backend URL (you should set this in Vercel settings)
    API_HOST = 'https://animaltheoryroyale-backend.onrender.com'; 
  } else if (hostname === 'localhost' || hostname === '127.0.0.1') {
    API_HOST = 'http://localhost:5000';
  } else {
    API_HOST = `http://${hostname}:5000`;
  }
}

export default API_HOST;
