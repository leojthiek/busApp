import { Box, Button, TextField, Typography, styled } from "@mui/material"
import React from "react"
import { KeyboardArrowRight } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import { userRegisterAction } from "../redux/features/registerFeature"


const MainBox = styled("div")(({ theme }) => ({
  display: "flex",
  height: "90vh",
  justifyContent: "center",
  alignItems: "center",
}))

const FirstBox = styled("div")(({ theme }) => ({
  width: "600px",
  height: "700px",
  backgroundColor: "#393E46",
  borderTopLeftRadius: "20px",
  borderEndStartRadius: "20px",
  boxShadow: "5px 4px 5px 0px rgba(0,0,0,0.64)",
  WebkitBoxShadow: "5px 4px 5px 0px rgba(0,0,0,0.64)",
  MozBoxShadow: " 5px 4px 5px 0px rgba(0,0,0,0.64)",

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}))

const SecondBox = styled("div")(({ theme }) => ({
  width: "700px",
  height: "700px",
  boxShadow: "5px 4px 5px 0px rgba(0,0,0,0.64)",
  WebkitBoxShadow: "5px 4px 5px 0px rgba(0,0,0,0.64)",
  MozBoxShadow: " 5px 4px 5px 0px rgba(0,0,0,0.64)",
  borderTopRightRadius: "20px",
  borderEndEndRadius: "20px",

  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}))

const Title = styled("div")(({ theme }) => ({}))

const Forms = styled("form")(({ theme }) => ({
  paddingTop: "14px",
  paddingLeft: "30px",
  width: "auto",
  marginRight: "20px",

  [theme.breakpoints.down("md")]: {},
}))



export default function RegisterPage() {
  const [name, setName] = React.useState("")
  const [phoneNumber, setPhoneNumber] = React.useState("")
  const [age, setAge] = React.useState("")
  const [password, setPassword] = React.useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const registerUser = useSelector((state)=> state.registerUser)
  const {userRegister,error,loading} = registerUser

  const handleSubmit = (e)=>{
    e.preventDefault()

    dispatch(userRegisterAction({name,phoneNumber,age,password}))
  }

  React.useEffect(()=>{
    if(userRegister !== null && !error){
      navigate('/login')
    }
  },[userRegister,navigate,error])

  return (
    <MainBox>
      <FirstBox>
        <div>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "35px",
              fontWeight: "600",
              color: "white",
              paddingTop: "30px",
            }}
          >
            Welcome Aboad
          </Typography>
        </div>
        <div>
          <img
            src='/logo.png'
            alt='study img'
            style={{ width: "500px", height: "500px", objectFit: "contain" }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to='/login' >
            <Button variant='contained' endIcon={<KeyboardArrowRight />}>
              Sign in
            </Button>
          </Link>
        </div>
      </FirstBox>
      <SecondBox>
        <Title>
          <Typography
            sx={{
              fontSize: "1.8rem",
              fontWeight: "700",
              paddingTop: "40px",
              paddingLeft: "30px",
            }}
          >
            Create an account
          </Typography>
        </Title>
        <Typography sx={{paddingLeft:'30px', color:"gray"}}>Fill out the form to get started</Typography>

        {error && <h3>{error}</h3>}

        <Forms onSubmit={handleSubmit}>
          <TextField
            required
            label='Enter your name'
            variant='outlined'
            type='text'
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ paddingBottom: "16px" }}
          />
          <TextField
            required
            label='Enter your phone Number'
            variant='outlined'
            type='number'
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            sx={{ paddingBottom: "16px" }}
          />

          <TextField
            required
            label='Enter your age.'
            variant='outlined'
            type='number'
            fullWidth
            sx={{ paddingBottom: "16px" }}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <TextField
            required
            label='Enter your password'
            variant='outlined'
            type='password'
            fullWidth
            sx={{ paddingBottom: "16px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        
          <div style={{display:'flex',justifyContent:'center',paddingBottom:'20px', paddingTop:'20px'}}>
            <Button variant='contained' type='submit' sx={{width:'80%',height:'45px'}}>
              sign up
            </Button>
          </div>
        </Forms>
        <Typography
          style={{
            textAlign: "center",
            paddingBottom: "10px",
            fontWeight: "bold",
          }}
        >
          OR
        </Typography>

        <Box>
          <Typography style={{ textAlign: "center" }}>
            Already register ?{" "}
            <Link style={{ cursor: "pointer" }} to={"/login"}>
              Login
            </Link>
          </Typography>
        </Box>
      </SecondBox>
    </MainBox>
  )
}
