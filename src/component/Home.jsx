import React, { useEffect, useRef, useState } from 'react'
import ProjectContainer from './ProjectContainer.jsx';
import { mydetails, projects } from '../data/projectData';
import Help from './Help.jsx'
function Home() {
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    checkSesstion();
  }, [])

  const checkSesstion = async function () {
    setLoader(true);
    try {
      let response = await fetch("http://worlddevelopment.in/checksesstion", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        credentials: 'include'
      })
      if (response.ok) {
        setLoader(false);
        const data = await response.json();
        if (data.user) {
          setLoader(false);
          window.sessionStorage.setItem("user", data.user);
        }
      }
    } catch (error) {
      console.error('Error during check user sesstion in Home.js:', error);
    } finally {
      setLoader(false);
    }
  }

  return <>
    {loader ?
      <div className='loaderbody'>
        <div className="loader"></div>
      </div>
      :
      <div>
        <div className="container-home">
          <div className="cell">
            <h2>{mydetails.name}</h2>
            <p className='detailscss'>{mydetails.phone}</p>
            <p className='detailscss'>{mydetails.email}</p>
            <p className='detailscss'>{mydetails.address}</p>
            <div className='mydec'>
              {mydetails.description}
            </div>
          </div>
          <div className="cell">
            <h2>Project Details</h2>
            <p>Click on Project Tile to go on GitHub repo</p>
            <div className="projects-container">
              {projects.map((project, index) => {
                return <div key={index} className="project-card first-animation">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              })}
            </div>

          </div>
          <div className="cell">
            <h2>You should See</h2>
            <ProjectContainer />
          </div>
          <div className="cell">
            <Help />
          </div>
        </div>

        <footer className='footer-login-page'>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contacts</a></li>
          </ul>
          <p>&copy; All rights reserved.</p>
        </footer>
      </div>
    }
  </>;
}

export default Home