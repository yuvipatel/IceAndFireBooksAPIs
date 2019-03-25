import _ from 'lodash';

/**
 * Generic error handler for handling all http errors
 */
const errorHandler = (err, req, res, next): any => {
  const errorObj: any = {
    status_code: 500,
    status: 'failure',
    message: 'Something went wrong!'
  };

  if (err.name === 'MongoError' && err.message && err.message.startsWith('E11000')) {
    const field = err.message.split('index:')[1];
    let key = field.split(' dup key')[0];
    let value = field.split(' dup key')[1];
    key = key.substring(0, field.lastIndexOf('_')); // returns field name
    value = value.replace('{ : ', '').replace(' }', '').replace(' \"', '');

    errorObj.status_code = 409;
    errorObj.message = `Duplicate entry value ${value} for field${key}!`;
  } else if (err.name === 'CastError') {
    errorObj.status_code = 400;
    errorObj.message = err.message;
  } else if (err.message && err.message.startsWith('Cast to ObjectId')) {
    errorObj.status_code = err.statusCode ? err.statusCode : 500;
    errorObj.message = 'Invalid id, please check your request.';
  }

  console.error(err);
  res.status(errorObj.status_code).json(errorObj);
};

const joiErrorHandler = (err, req, res, next): any => {
  if (err.isJoi && !_.isEmpty(err.details)) {
    const regex = /"/gi;
    let message = `${err._meta.source} parameter ${err.details[0].message}`;
    message = message.replace(regex, '');
    res.status(400).json({ status_code: 400, status: 'failure', message });
  } else {
    next(err);
  }
};

export default {
  errorHandler,
  joiErrorHandler
};
