import adapter from '@sveltejs/adapter-netlify';
//mport adapter from '@sveltejs/adapter-vercel';

const config = { kit: { adapter: adapter() } };

export default config;
