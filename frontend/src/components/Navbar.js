import React from "react"
import { Typography, Button, styled, IconButton } from "@mui/material"
import "./Navbar.css"
import { Link } from "react-router-dom"
import LogoutIcon from "@mui/icons-material/Logout"
import { useDispatch, useSelector } from "react-redux"
import { logoutUserAction } from "../redux/features/loginFeatures"

export default function Navbar() {
  const userLogin = useSelector((state) => state.userLogin)
  const { user } = userLogin

  const dispatch = useDispatch()

  const handleLogout = () => {
     dispatch(logoutUserAction())
  }

  const NavbarIcon = styled(Typography)(({ theme }) => ({
    fontSize: "1.50rem",
    fontFamily: "sans-serif",
    fontWeight: "600",
    paddingLeft: "100px",

    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
      paddingLeft: "10px",
    },
  }))

  const NavbarBtnContainer = styled("div")(({ theme }) => ({
    paddingRight: "100px",

    [theme.breakpoints.down("md")]: {
      paddingRight: "10px",
    },
  }))
  return (
    <div className='navbarMain'>
      <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
        <NavbarIcon>Leoj Transport</NavbarIcon>
      </Link>
      <NavbarBtnContainer>
        {user && user ? (
          <>
          <Link to={"/profile"}>
            <Button
              sx={{
                ":hover": { backgroundColor: "rgb(32, 29, 29)" },
                color: "white",
              }}
            >
              {user.name}
            </Button>
          </Link>
          <Link to={"/profile"}>
            <IconButton onClick={handleLogout}>
            <Button
              sx={{
                ":hover": { backgroundColor: "rgb(32, 29, 29)" },
                color: "white",
              }}
            >
              {<LogoutIcon/>}
            </Button>
            </IconButton>
          </Link>
          </>
          
        ) : (
          <Link to={"/login"}>
            <Button
              sx={{
                ":hover": { backgroundColor: "rgb(32, 29, 29)" },
                color: "white",
              }}
            >
              Sign In
            </Button>
          </Link>
        )}
      </NavbarBtnContainer>
    </div>
  )
}
