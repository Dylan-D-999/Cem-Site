import adapter from '@sveltejs/adapter-static';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
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

export default defineConfig({
	plugins: [
		enhancedImages(), // must come before the SvelteKit plugin
    sveltekit()
	]
});