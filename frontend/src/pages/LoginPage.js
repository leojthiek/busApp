import { Box, Button, TextField, Typography, styled } from "@mui/material"
import React from "react"
import { KeyboardArrowRight } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { userLoginAction } from "../redux/features/loginFeatures"

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



export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = React.useState("")
  const [password, setPassword] = React.useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const userLogin = useSelector((state)=> state.userLogin)
  const {user,error,loading} = userLogin

  const handleSubmit = (e) =>{
   e.preventDefault()
   dispatch(userLoginAction({phoneNumber,password}))
  }

  React.useEffect(()=>{
    if(user && error === null){
       navigate('/')
    }
  },[error,navigate,user])

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
          <Link to='/register'>
            <Button variant='contained' endIcon={<KeyboardArrowRight />}>
              Sign up
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
            Login to your account
          </Typography>
        </Title>
        <Typography sx={{paddingLeft:'30px', color:"gray"}}>Please fill in the form to Log in</Typography>


        <Forms sx={{paddingTop:'80px'}} onSubmit={handleSubmit}>
       
        {error && <h3 style={{color:'red', textAlign:'center',paddingBottom:'4px'}}>{error}</h3>}

          <TextField
            required
            label='Enter your Phone No.'
            variant='outlined'
            type='text'
            fullWidth
            sx={{ paddingBottom: "16px" }}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
              sign in
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
            <Link style={{ cursor: "pointer" }} to={"/register"}>
              register
            </Link>
          </Typography>
        </Box>
      </SecondBox>
    </MainBox>
  )
}
