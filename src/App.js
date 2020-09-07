import React, { useState } from 'react';
import validate from './validation';
import './App.css';

const initValue = {
  email: {
    isValid: true,
    isEmpty: false,
  },
  name: {
    isValid: true,
    isEmpty: false,
  },
  password: {
    isValid: true,
    isEmpty: false,
  },
};

function App() {
  const [email, setEmail] = useState({
    value: '',
    isValid: true,
    isEmpty: false,
  });
  const [name, setName] = useState({
    value: '',
    isValid: true,
    isEmpty: false,
  });
  const [password, setPassword] = useState({
    value: '',
    isValid: true,
    isEmpty: false,
  });

  const onChange = (e) => {
    if (e.target.name === 'email') {
      console.log('email', email);
      setEmail({ ...initValue['email'], value: e.target.value });
    }
    if (e.target.name === 'name') {
      setName({ ...initValue['name'], value: e.target.value });
    }
    if (e.target.name === 'password') {
      setPassword({ ...initValue['password'], value: e.target.value });
    }
  };

  const isValidAll = () => {
    const data = { email, name, password };
    validate(data).then((res) => {
      for (let prop in res) {
        if (prop === 'email') {
          setEmail({ ...res[prop] });
        }
        if (prop === 'name') {
          setName({ ...res[prop] });
        }
        if (prop === 'password') {
          setPassword({ ...res[prop] });
        }
      }
    });
  };

  const isValid = (e) => {
    e.persist();
    const data = { email, name, password };
    validate(data).then((res) => {
      console.log('blur res', res);

      if (e.target.name === 'email') {
        debugger;
        setEmail({ ...res['email'] });
      } else if (e.target.name === 'name') {
        setName({ ...res['name'] });
      } else if (e.target.name === 'password') {
        setPassword({ ...res['password'] });
      }
    });
  };

  const onSubmit = () => {
    console.log('submit');
    isValidAll();
  };

  console.log('render');

  return (
    <div className="App">
      <label>
        Email
        <input type="email" name="email" onChange={onChange} onBlur={isValid} />
        {!email.isValid &&
          (email.isEmpty ? (
            <p style={{ color: 'red' }}>empty email</p>
          ) : (
            <p style={{ color: 'red' }}>incorrect email</p>
          ))}
      </label>
      <label>
        Name
        <input type="text" name="name" onChange={onChange} onBlur={isValid} />
        {!name.isValid &&
          (name.isEmpty ? (
            <p style={{ color: 'red' }}>empty name</p>
          ) : (
            <p style={{ color: 'red' }}>incorrect name</p>
          ))}
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          onChange={onChange}
          onBlur={isValid}
        />
        {!password.isValid &&
          (password.isEmpty ? (
            <p style={{ color: 'red' }}>empty password</p>
          ) : (
            <p style={{ color: 'red' }}>must be at least 6 characters</p>
          ))}
      </label>
      <button onClick={onSubmit}>SUBMIt</button>
    </div>
  );
}

export default App;
