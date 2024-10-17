const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message("Password must be at least 8 characters");
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message(
      "Password must contain at least 1 letter and 1 number"
    );
  }
  return value;
};

const validateFutureDate = (value, helpers) => {
  const currentDate = new Date();
  if (new Date(value) < currentDate) {
      return helpers.error('any.invalid', { message: 'Date From must be greater than or equal to the current date' });
  }
  return value;
};

const validateGreaterDate = (value, helpers) => {
  const appliedDate = helpers.state.ancestors[0].appliedDate;
  if (new Date(value) < new Date(appliedDate)) {
      return helpers.error('date.greater', { message: 'Date To must be greater than or equal to Applied Date' });
  }
  return value;
};


export default {
  password,
  validateFutureDate,
  validateGreaterDate
};
