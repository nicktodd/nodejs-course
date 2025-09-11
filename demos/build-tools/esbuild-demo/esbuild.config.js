// Simple esbuild config for demo
require('esbuild').build({
  entryPoints: ['index.js'],
  bundle: true,
  outfile: 'dist/bundle.js',
  minify: false,
  sourcemap: true,
}).catch(() => process.exit(1));
