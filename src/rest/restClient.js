import axios from 'axios';

const client = axios.create();
client.defaults.headers.common['Authorization'] = `Bearer ${process.env.SANDBOX_TOKEN}`;

export default client;