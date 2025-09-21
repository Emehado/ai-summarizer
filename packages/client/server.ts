import index from './index.html';

Bun.serve({
  routes: {
    '/': index,
    '/vite.svg': () => new Response(Bun.file('./public/vite.svg')),
  },
  development: {
    hmr: true,
    console: true,
  },
  port: 5173, // Same port as Vite default
});

console.log('Server running at http://localhost:5173');
