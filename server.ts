import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

function resolvePort(): number {
  const nginxPort = process.env.NGINX_PORT;
  const envPort = process.env.PORT;
  const defaultPort = process.env.DEFAULT_APP_PORT;

  if (process.env.APP_PORT) {
    return Number(process.env.APP_PORT);
  }
  // In container environments where NGINX listens on PORT (e.g. 8080) and proxies to 3000
  if (nginxPort && envPort === nginxPort) {
    return Number(defaultPort || 3000);
  }
  // Direct Cloud Run container where PORT is passed to the app
  if (envPort) {
    return Number(envPort);
  }
  if (defaultPort) {
    return Number(defaultPort);
  }
  return 3000;
}

const PORT = resolvePort();
const HOST = '0.0.0.0';

app.use(express.json());

// API Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    app: 'BRUT.E',
    timestamp: new Date().toISOString()
  });
});

// Serve static assets from dist
const distPath = path.resolve(__dirname, 'dist');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
} else {
  app.get('/', (_req, res) => {
    res.send('BRUT.E Atelier Server running. Please run npm run build to compile static assets.');
  });
}

const server = app.listen(PORT, HOST, () => {
  console.log(`[BRUT.E Atelier] Server listening on http://${HOST}:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
