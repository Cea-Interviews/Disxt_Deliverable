module.exports = (res, status, data) => {
  const statusCodes = {
    200: 'data',
    201: 'data',
    400: 'error',
    401: 'error',
    404: 'error',
    403: 'error',
    500: 'error',
    409: 'error',
  };

  res.status(status).json({
    status,
    [statusCodes[status]]: data,
  });
};