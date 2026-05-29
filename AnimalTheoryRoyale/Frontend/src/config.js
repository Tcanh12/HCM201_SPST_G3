// API Configuration - Change this IP to your machine's WiFi IP
// For localhost only: const API_HOST = 'http://localhost:5000';
// For LAN play: use your WiFi IP

const hostname = window.location.hostname;
const API_HOST = import.meta.env.VITE_API_URL || (hostname === 'localhost' || hostname === '127.0.0.1'
  ? 'http://localhost:5000'
  : `http://${hostname}:5000`);

export default API_HOST;
