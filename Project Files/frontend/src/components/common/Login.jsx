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
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axiosInstance from "./AxiosInstance";
import PublicNavbar from "./PublicNavbar";

const Login = () => {
   const navigate = useNavigate()
   const [data, setData] = useState({
      email: "",
      password: "",
   })

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      if (!data?.email || !data?.password) {
         return alert("Please fill all fields");
      } else {
         axiosInstance.post('/api/user/login', data)
            .then((res) => {
               if (res.data.success) {
                  alert(res.data.message)

                  localStorage.setItem("token", res.data.token);
                  localStorage.setItem("user", JSON.stringify(res.data.userData));
                  navigate('/dashboard')
                  setTimeout(() => {
                     window.location.reload()
                  }, 1000)
               } else {
                  alert(res.data.message)
               }
            })
            .catch((err) => {
               if (err.response && err.response.status === 401) {
                  alert("User doesn't exist");
               }
               navigate("/login");
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
                     <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                     Sign In
                  </Typography>
                  <Typography className="auth-subtitle">
                     Welcome back. Access your personalized learning dashboard.
                  </Typography>
                  <Box className="auth-form" component="form" onSubmit={handleSubmit} noValidate>
                     <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        autoComplete="email"
                        autoFocus
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
                     <Box mt={2}>
                        <Button type="submit" variant="contained" className="btn-gradient">
                           Sign In
                        </Button>
                     </Box>
                     <Grid container className="auth-footer">
                        <Grid item>
                           New here?
                           <Link className="auth-link" to="/register" variant="body2">
                              {" Create an account"}
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

export default Login



