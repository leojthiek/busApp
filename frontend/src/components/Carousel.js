import React from "react"
import "./Carousel.css"
import { Button, Grid, Typography, styled } from "@mui/material"
import { Link } from "react-router-dom"

export default function Carousel() {
    const MainTitle = styled(Typography)(({theme})=>({
        fontSize: "2.5rem",
        fontWeight: '700',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',

        [theme.breakpoints.down('md')]:{
            fontSize:'1.70rem',
            fontWeight: '700',
            display:'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    }))

    const SecondMainTitle = styled(Typography)(({theme})=>({
        fontSize: "1rem",
        fontWeight: '700',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
         paddingLeft:'50px',

        [theme.breakpoints.down('md')]:{
            fontSize:'1rem',
            fontWeight: '700',
            display:'flex',
            justifyContent: 'center',
            paddingLeft:'10px'
        }
    }))
  return (
    <Grid container className='carouselMain'>
      <Grid item md={6} sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'20px'}}>
        <MainTitle>
          Embark on a Journey of Safety and Comfort with Us.
        </MainTitle>
        <div>
          <SecondMainTitle>
            Join us on board for a road trip where safety, comfort, and
            reliability converge, ensuring you a hassle-free and enjoyable
            journey to your destination
          </SecondMainTitle>
          <div className='CarouselBtnContainer'>
            <Link to={'/register'} style={{textDecoration:'none'}}>
            <Button sx={{backgroundColor:'green',color:'white', maxWidth:'20rem'}}>Register with Us</Button>
            </Link>
          </div>
        </div>
      </Grid>
      <Grid item md={6} className='imageContainer'>
        <img src='bus1.png'alt="bus" className='carouselImage' />
      </Grid>
    </Grid>
  )
}
