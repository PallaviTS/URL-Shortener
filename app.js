import express from 'express';
import logger from 'morgan';

import shortUrlsRouter from './routes/shortUrls/index';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/shortUrls', shortUrlsRouter);

app.all('*', (req, res, next) => {
  const err = new Error(`Cannot find ${req.originalUrl} on this server!`);
  err.status = 405;
  err.message = 'Method Not Allowed';
  return next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(logger('dev'));
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
  });
});

export default app;
