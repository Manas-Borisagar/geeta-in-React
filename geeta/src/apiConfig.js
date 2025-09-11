// Import the key from Vite's .env object
export const API_BASE_URL = 'https://bhagavad-gita3.p.rapidapi.com/v2';

// We create a reusable options object for the 'fetch' API
export const API_OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': "324e2e33f6msh86bbecd9f04b305p1c3271jsnfe0d794e35c5", // Use the variable here
        'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
    }
};