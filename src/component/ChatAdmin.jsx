import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function ChatAdmin() {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const [isSession, setisStssion] = useState(false);
  useEffect(() => {
    checkSesstion()
  }, [])
  const checkSesstion = async function () {
    setLoader(true);
    //checking for session
    try {
      let response = await fetch("http://worlddevelopment.in/checksesstion", {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        method: "POST",
        body: JSON.stringify({ "sessionCheck": "sessionCheck" }),
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        if (data.user) {
          window.sessionStorage.setItem("user", data.user)
          setisStssion(true);
          navigate('/chatadminhome');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoader(false);
    }
  }
  const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [islogin, setIsLogin] = useState(true);
    function handleChangeForm(event) {
      event.target.innerText == "Log in" ? setIsLogin(true) : setIsLogin(false);
    }
    const handleSignup = async (e) => {
      e.preventDefault();
      let name = e.target.childNodes[0].childNodes[1].value;
      let username = e.target.childNodes[1].childNodes[1].value;
      let password = e.target.childNodes[2].childNodes[1].value;
      let website = e.target.childNodes[3].childNodes[1].value;
      try {
        let response = await fetch("http://worlddevelopment.in/signup", {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          method: "POST",
          body: JSON.stringify({ name, username, password, website }),
          credentials: 'include'
        })
        if (response.ok) {
          const data = await response.json();
          sessionStorage.setItem("user", data.user);
          navigate('/chatadminhome');
        } else {
          alert("User already Exist");
        }
      } catch (error) {
        alert('Sign up failed');
      }
    }
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        let response = await fetch("http://worlddevelopment.in/login", {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({ username, password }),
          credentials: 'include'
        })
        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            sessionStorage.setItem("user", data.user);
            navigate('/chatadminhome');
          } else {
            alert('Login failed');
          }
        } else {
          navigate('/unautherized');
        }
      } catch (error) {
        navigate('/unautherized');
      }
    };
    return (
      loader ? <div className='loaderbody'>
        <div className="loader"></div>
      </div> :
        <div className='chat-admin-body'>
          <div className="container-login">
            <h1>Make the support system more modern</h1>
            <p>Write Your Chat Support in easy and manageble way and relese it on your Website or on Your Mobile Application <a target="_blank" href="/supportchatdocumentation" className="modern-link">Documentation</a></p>
          </div>
          <div className="features">
            <div className="header-buttons">
              <button onClick={handleChangeForm} className="button-login-page" >Log in</button>
              <button onClick={handleChangeForm} className="button-login-page">Sign Up</button>
            </div>
            {islogin ?
              <div id='lin' className='loginform'>
                <h2>Login</h2>
                <form onSubmit={handleLogin} autoComplete="on">
                  <div className="form-row">
                    <label htmlFor="name">Username:</label>
                    <input autoComplete="on" type="email" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username Ex: example@somthing.com" />
                  </div>
                  <div className="form-row">
                    <label htmlFor="name">Password:</label>
                    <input autoComplete="on" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                  </div>
                  <div className="form-row">
                    <button id="submitbtn" type="submit">Login</button>
                  </div>
                </form>
              </div>
              :
              <div id='siup' className='loginform'>
                <h2>Signup</h2>
                <form onSubmit={handleSignup}>
                  <div className="form-row">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" placeholder='Enter your name' />
                  </div>
                  <div className="form-row">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="username" placeholder='Email as username' />
                  </div>
                  <div className="form-row">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" placeholder='Password' />
                  </div>
                  <div className="form-row">
                    <label htmlFor="website">Website URL:</label>
                    <input type="text" name="name" placeholder='http//aprve53.github.io' />
                  </div>
                  <div className="form-row">
                    <input type="submit" value="Submit" />
                  </div>
                </form>
              </div>
            }
          </div>
          <footer className='footer-login-page'>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contacts</a></li>
            </ul>
            <p>&copy; All rights reserved.</p>
          </footer>
        </div >
    )
  }
  return (
    isSession ? null : <Login />
  )
}
