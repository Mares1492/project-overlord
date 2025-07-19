//import adapter from '@sveltejs/adapter-netlify';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

const config = { kit: {
    preprocess: vitePreprocess(), 
    adapter: adapter() 
} };

export default config;
