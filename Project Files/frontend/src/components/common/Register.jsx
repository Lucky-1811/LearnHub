import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axiosInstance from "./AxiosInstance";
import Dropdown from "react-bootstrap/Dropdown";
import PublicNavbar from "./PublicNavbar";




const Register = () => {
   const navigate = useNavigate()
   const [selectedOption, setSelectedOption] = useState('Select User');
   const [data, setData] = useState({
      name: "",
      email: "",
      password: "",
      type: "",
   })

   const handleSelect = (eventKey) => {
      setSelectedOption(eventKey);
      setData({ ...data, type: eventKey });
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault()
      if (!data?.name || !data?.email || !data?.password || !data?.type) return alert("Please fill all fields");
      else {
         axiosInstance.post('/api/user/register', data)
            .then((response) => {
               if (response.data.success) {
                  alert(response.data.message)
                  navigate('/login')

               } else {
                  console.log(response.data.message)
               }
            })
            .catch((error) => {
               console.log("Error", error);
            });
      }
   };


   return (
      <>
         <PublicNavbar />
         <div className="auth-page">
            <Container className="auth-container">
               <Box className="auth-card glass" component="main">
                  <Avatar className="auth-avatar">
                     <PersonOutlineIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                     Create your account
                  </Typography>
                  <Typography className="auth-subtitle">
                     Start learning with premium content tailored to your goals.
                  </Typography>
                  <Box className="auth-form" component="form" onSubmit={handleSubmit} noValidate>
                     <TextField
                        margin="normal"
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        autoComplete="name"
                        autoFocus
                        InputProps={{
                           startAdornment: (
                              <InputAdornment position="start">
                                 <PersonOutlineIcon />
                              </InputAdornment>
                           ),
                        }}
                     />
                     <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        autoComplete="email"
                        InputProps={{
                           startAdornment: (
                              <InputAdornment position="start">
                                 <MailOutlineIcon />
                              </InputAdornment>
                           ),
                        }}
                     />
                     <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        InputProps={{
                           startAdornment: (
                              <InputAdornment position="start">
                                 <LockOutlinedIcon />
                              </InputAdornment>
                           ),
                        }}
                     />
                     <Dropdown className="role-dropdown">
                        <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                           {selectedOption}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                           <Dropdown.Item onClick={() => handleSelect("Student")}>Student</Dropdown.Item>
                           <Dropdown.Item onClick={() => handleSelect("Teacher")}>Teacher</Dropdown.Item>
                        </Dropdown.Menu>
                     </Dropdown>
                     <Box mt={2}>
                        <Button type="submit" variant="contained" className="btn-gradient">
                           Sign Up
                        </Button>
                     </Box>
                     <Grid container className="auth-footer">
                        <Grid item>
                           Already have an account?
                           <Link className="auth-link" to="/login" variant="body2">
                              {" Sign In"}
                           </Link>
                        </Grid>
                     </Grid>
                  </Box>
               </Box>
            </Container>
         </div>

      </>
   )
}

export default Register


