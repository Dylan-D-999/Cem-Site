import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',  // SPA mode - all routes go to index.html
      precompress: false,
      strict: false  // Don't error on dynamic routes
    })
  }
};

export default config;
