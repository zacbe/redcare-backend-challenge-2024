import { app } from './server';
import { env } from './utils/envConfig';

const server = app.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  console.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});

const onCloseSignal = () => {
  console.info('sigint received, shutting down');

  server.close(() => {
    console.info('HTTP server closed');
    process.exit(0);
  });

  setTimeout(() => {
    console.warn('Forcing shutdown due to timeout');
    process.exit(1);
  }, 10000).unref();
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);
