// LoginPage.js
import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import SavingsIcon from "@mui/icons-material/Savings";

import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginAPI, adminLogin } from "../../utils/ApiRequest";
// import {jwtDecode} from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const Roles = {
    ADMIN: "admin",
    USER: "user",
  };
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("username")) {
      navigate("/");
    }
  }, [navigate]);

  const [values, setValues] = useState({
    email: "",
    password: "",
    role: Roles.USER
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    
  
    const { email, password, role } = values;
    setLoading(true);
    
    if (!email || !password || !role) {
      toast.error("Please fill all the fields", toastOptions);
      setLoading(false);
      return;
    }
    const apiEndpoint = role === "admin" ? adminLogin : loginAPI;
    
    try {
      const { data } = await axios.post(apiEndpoint, {
        email,
        password,
      });
      console.log("dat",data);
      
      if (data.success === true) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", JSON.stringify(values.role));
        console.log(data);
  
        // Decode the token AFTER storing it
        // const decoded = {jwtDecode}(data.token);
        // console.log("Decoded JWT: ", decoded);
  
        // Optional: Save decoded user data if needed
        localStorage.setItem("username", JSON.stringify(data.user || data.admin));
  
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
  
        toast.success(data.message, toastOptions);
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong, please try again.",
        toastOptions
      );
    }
  
    setLoading(false);
  };
  

  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    await loadFull(engine);
  }, []);

  // const particlesLoaded = useCallback(async (container) => {
  //   // await console.log(container);
  // }, []);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
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
      <Container
        className="mt-5"
        style={{ position: "relative", zIndex: 2}}
      >
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h1 className="text-center mt-5">
              <SavingsIcon
                sx={{ fontSize: 40, color: "white" }}
                className="text-center"
              />
            </h1>
            <h2 className="text-white text-center ">Login</h2>
            <Form>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label className="text-white">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                />
              </Form.Group>
              <Form.Group controlId="formBasicRole" className="mt-3">
                <Form.Label className="text-white">Select Role</Form.Label>
                <Form.Select
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                >
                  <option value={Roles.USER}>User</option>
                  <option value={Roles.ADMIN}>Admin</option>
                </Form.Select>
              </Form.Group>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
                className="mt-4"
              >
                {/* <Link to="/forgotPassword" className="text-white lnk">
                  Forgot Password?
                </Link> */}

                <Button
                  type="submit"
                  className=" text-center mt-3 btnStyle"
                  onClick={!loading ? handleSubmit : null}
                  disabled={loading}
                >
                  {loading ? "Signin…" : "Login"}
                </Button>

                <p className="mt-3" style={{ color: "#9d9494" }}>
                  Don't Have an Account?{" "}
                  <Link to="/register" className="text-white lnk">
                    Register
                  </Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Login;
