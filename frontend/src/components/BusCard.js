import { Box, Button, Container, Grid, Typography } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"

export default function BusCard({buses,error,loading}) {

  
  return (
    <Grid container spacing={2}>
      {error && <p style={{color:'red'}}>{error}</p>}
      {buses && buses.map((bus)=> (
      <Grid item md={3}>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "rgb(32, 29, 29)",
            color: "white",
            borderRadius: "10px",
          }}
        >
          <img
            src={'/bus3.png'}
            alt='bus1'
            style={{ width: "100%", objectFit: "contain" }}
          />
          <Box sx={{ paddingBottom: "30px" }}>
            <Container>
              <Typography
                sx={{
                  fontSize: "1.50rem",
                  fontWeight: "800",
                  fontFamily: "sans-serif",
                }}
              >
                {bus.busName}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "800",
                  fontFamily: "sans-serif",
                  paddingBottom: "10px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>{bus.departureCity}</span> To{" "}
                <span style={{ fontWeight: "bold" }}>{bus.arriveCity}</span>
              </Typography>

              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "800",
                  fontFamily: "sans-serif",
                  paddingBottom: "5px",
                }}
              >
                Total No. of seats : <span>{bus.totalSeat}</span>
              </Typography>

              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "800",
                  fontFamily: "sans-serif",
                  paddingBottom: "5px",
                }}
              >
                {" "}
                Available seats : <span>{bus.availableSeat}</span>
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "800",
                  fontFamily: "sans-serif",
                  paddingBottom: "5px",
                }}
              >
                Price per seat : <span> &#8377; {bus.price}</span>
              </Typography>
              <Link to={`/bus/${bus._id}`} style={{textDecoration:'none'}}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "20px",
                  }}
                >
                  <Button
                    sx={{
                      width: "90%",
                      backgroundColor: "green",
                      color: "white",
                      ":hover": { backgroundColor: "rgb(128, 128, 0)" },
                    }}
                  >
                    book now
                  </Button>
                </div>
              </Link>
            </Container>
          </Box>
        </Box>
      </Grid>
     ))}
    </Grid>
  )
}
