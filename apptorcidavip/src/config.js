

const API_BASE_URL = process.env.NODE_ENV === 'development'
? process.env.REACT_APP_API_BASE_LOCALHOST
: process.env.REACT_APP_API_BASE_PROD




export default API_BASE_URL