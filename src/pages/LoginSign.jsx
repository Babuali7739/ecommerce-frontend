import React, { useState } from 'react';
import './CSS/LoginSign.css';

export const LoginSign = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const [errors, setErrors] = useState({}); // State to store validation errors

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors on input change
  };

  const validateForm = () => {
    const newErrors = {};
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Username validation (for signup only)
    if (state === "Sign Up" && !formData.username) {
      newErrors.username = "Username is required";
    }

    return newErrors;
  };

  const login = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Login Function Executed", formData);
    let responseData;
    await fetch('https://ecommerce-backend-9dq4.onrender.com/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      alert("Welcome to shoppeer"); 
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  const signup = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Signup Function Executed", formData);
    let responseData;
    await fetch('https://ecommerce-backend-9dq4.onrender.com/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
      alert("Login Succesful!");
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" &&
            <>
              <input onChange={changeHandler} type="text" value={formData.username} name="username" placeholder='Your Name' />
              {errors.username && <span className="error">{errors.username}</span>}
            </>
          }

          <input onChange={changeHandler} type="email" value={formData.email} name="email" placeholder='Email Address' />
          {errors.email && <span className="error">{errors.email}</span>}

          <input onChange={changeHandler} type="password" value={formData.password} name="password" placeholder='Password' />
          {errors.password && <span className="error">{errors.password}</span>}

        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>

        {state === "Sign Up"
          ? <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}>Login Here</span></p>
          : <p className="loginsignup-login">Create an account <span onClick={() => { setState("Sign Up") }}>Click here</span></p>
        }

        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSign;
