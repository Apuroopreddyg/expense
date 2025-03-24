// NavbarComponent.js
import React, { useCallback, useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import "./style.css";
import { useNavigate } from 'react-router-dom';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
const Header = () => {
  
const navigate = useNavigate();

  const handleShowLogin = () =>{
    navigate("/login");
  }

  const [user, setUser] = useState();

  useEffect(() => {
    
      if (localStorage.getItem("username")) {
        const user = JSON.parse(localStorage.getItem("username"));
        setUser(user);
        
      }
    
  }, []);

  const handleShowLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }

  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    await loadSlim(engine);
  }, []);

  // const particlesLoaded = useCallback(async (container) => {
  //   // await console.log(container);
  // }, []);
  
  return (
    <>
    <div style={{ position: 'relative', overflow: 'hidden', zIndex: 1 }}>
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: { value: "#0d0d1f" } // darker background for better light/shadow contrast
        },
        fpsLimit: 120,
        fullScreen: { enable: true, zIndex: -1 },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "light" },
            resize: true
          },
          modes: {
            light: {
              area: {
                gradient: {
                  start: { value: "#ffffff" },
                  stop: { value: "#0d0d1f" }
                },
                radius: 400
              },
              shadow: {
                color: { value: "#000000" },
                length: 800
              }
            }
          }
        },
        particles: {
          color: { value: "#ffffff" },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: false,
            speed: 1,
            straight: false
          },
          number: {
            value: 80,
            density: { enable: true, area: 800 }
          },
          opacity: {
            value: { min: 0.3, max: 1 },
            animation: {
              enable: true,
              speed: 1,
              sync: false
            }
          },
          shape: {
            type: "circle"
          },
          size: {
            value: { min: 1, max: 5 },
            animation: {
              enable: true,
              speed: 5,
              minimumValue: 0.3,
              sync: false
            }
          },
          zIndex: {
            value: { min: 0, max: 100 }
          }
        },
        detectRetina: true
      }}
    />
    <Navbar className="navbarCSS" collapseOnSelect expand="lg" style={{ position: 'relative', zIndex: 2 }}>
      {/* <Navbar className="navbarCSS" collapseOnSelect expand="lg" bg="dark" variant="dark"> */}
        <Navbar.Brand href="/" className="text-white navTitle">Expense Management System</Navbar.Brand>
        <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
          >
            <span
              className="navbar-toggler-icon"
              style={{
                background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`,
              }}
            ></span>
          </Navbar.Toggle>
        <div>
        <Navbar.Collapse id="responsive-navbar-nav" style={{color: "white"}}>
          {user ? (
            <>
            <Nav>
                <Button variant="primary" onClick={handleShowLogout} className="ml-2">Logout</Button>
              </Nav>
            </>
          ) : (

            <>
              <Nav>
                <Button variant="primary" onClick={handleShowLogin} className="ml-2">Login</Button>
              </Nav>
            </>
          )}
          
        </Navbar.Collapse>
      </div>
      </Navbar>
      </div>
    </>
  );
};

export default Header;
