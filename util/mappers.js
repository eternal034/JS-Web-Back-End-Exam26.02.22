function mapErrors(err) {
  if (Array.isArray(err)) {
    return err;
  } else if (err.name == 'ValidationError') {
    return Object.values(err.errors).map((error) => ({ msg: error.message }));
  } else if (typeof err.message == 'string') {
    return [{ msg: err.message }];
  } else {
    return [{ msg: 'Request error!' }];
  }
}

module.exports = mapErrors;
