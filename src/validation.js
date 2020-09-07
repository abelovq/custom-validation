import validator from 'validator';

const handlers = {
  name(val) {
    debugger;
    const copy = { ...val };
    if (!copy.value) {
      copy.isValid = false;
      copy.isEmpty = true;
    } else {
      copy.isValid = true;
      copy.isEmpty = false;
    }
    console.log('copy name', copy);
    return copy;
  },
  email(val) {
    debugger;
    const copy = { ...val };
    if (!copy.value) {
      copy.isValid = false;
      copy.isEmpty = true;
    } else if (!validator.isEmail(copy.value)) {
      copy.isValid = false;
      copy.isEmpty = false;
    } else {
      copy.isValid = true;
      copy.isEmpty = false;
    }
    console.log('copy email', copy);
    return copy;
  },
  password(val) {
    debugger;
    console.log('val', val);
    const copy = { ...val };
    if (!copy.value) {
      copy.isValid = false;
      copy.isEmpty = true;
    } else if (copy.value.length < 6) {
      copy.isValid = false;
      copy.isEmpty = false;
    } else {
      copy.isValid = true;
      copy.isEmpty = false;
    }
    console.log('copy password', copy);
    return copy;
  },
};

export default (data) => {
  debugger;
  return new Promise((res, rej) => {
    let validatedObj = {};
    for (let prop in data) {
      validatedObj = {
        ...validatedObj,
        [prop]: handlers[prop](data[prop]),
      };
    }
    for (let prop in validatedObj) {
      res(validatedObj);
    }
  });
};
