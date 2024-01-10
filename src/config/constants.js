const prod = 'https://jamproductions.pythonanywhere.com';
const dev = 'http://127.0.0.1:5000'
export const BASE_URL=process.env.NODE_ENV === 'development' ? dev : prod;
