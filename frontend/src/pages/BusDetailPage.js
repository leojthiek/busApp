import React, { useState } from "react"
import {
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import EventSeatIcon from "@mui/icons-material/EventSeat"
import "./BusDetailPage.css"
import { busDetailsAction } from "../redux/features/busDetailFetures"
import { useDispatch, useSelector} from "react-redux"
import { useParams } from "react-router-dom"
import { bookingTicketeAction } from "../redux/features/bookingFeatures"

export default function BusDetailPage() {
  const [seatNo, setSeatNo] = React.useState(null)

  const dispatch = useDispatch()
  const params = useParams()

  const busDetails = useSelector((state)=> state.busDetails)
  const {busDetail,error,loading} = busDetails

  const userLogin = useSelector((state)=> state.userLogin)
  const {user} = userLogin

  const ticketBooking = useSelector((state)=> state.ticketBooking)
  const {ticket,error:ticketError,loading:ticketLoading} = ticketBooking

  const userId = user && user._id
  const id = params.id

  React.useEffect(()=>{
     dispatch(busDetailsAction(id))
  },[dispatch,id])

  React.useEffect(()=>{
    if(ticket && !ticketError){
      alert(ticket)
    }

    if(ticketError){
      alert(ticketError)
    }
  },[ticket,ticketError])


  const handleSeatClick = (seatSelect) => {
    if (seatNo === seatSelect) {
      setSeatNo(null)
    } else {
      setSeatNo(seatSelect)
    }
  }

  const totalSeat = busDetail && busDetail.totalSeat

  const seatIcons = Array.from({ length: totalSeat }, (_, index) => (
    <IconButton
      key={index + 1}
      sx={{ fontSize: "40px", color: seatNo === index + 1 ? "green" : "white" }}
      onClick={() => handleSeatClick(index + 1)}
    >
      <EventSeatIcon fontSize='40px' />
    </IconButton>
  ))

  const handleBooking = (e) => {
    e.preventDefault()
    if(!user){
      return alert('please login or register to continue')
    }
    dispatch(bookingTicketeAction({ userId,busId:id,seatNumbers: seatNo }));
  }

  return (
    <div>
      {error && <h3>{error}</h3>}
      {loading ? <h3>Loading...</h3> : 
      <Grid
        container
        sx={{
          height: "auto",
          backgroundColor: "rgb(22, 30, 52)",
          color: "white",
          paddingBottom: "60px",
          width:'100%'
        }}
      >
        <Grid item md={6} sx={{width:'100%'}}>
          <div style={{ width: "100%" ,paddingTop:'60px'}}>
            <img
              src='/bus1.png'
              alt='bus'
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Bus Name</TableCell>
                  <TableCell sx={{ color: "white" }}>Bus No.</TableCell>
                  <TableCell sx={{ color: "white" }}>From</TableCell>
                  <TableCell sx={{ color: "white" }}>To</TableCell>
                  <TableCell sx={{ color: "white" }}>Total seats</TableCell>
                  <TableCell sx={{ color: "white" }}>Available seats</TableCell>
                  <TableCell sx={{ color: "white" }}>Journey Date</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>{busDetail && busDetail.busName}</TableCell>
                  <TableCell sx={{ color: "white" }}>{busDetail && busDetail.busNumber}</TableCell>
                  <TableCell sx={{ color: "white" }}>{busDetail && busDetail.departureCity}</TableCell>
                  <TableCell sx={{ color: "white" }}>{busDetail && busDetail.arriveCity}</TableCell>
                  <TableCell sx={{ color: "white" }}>{busDetail && busDetail.totalSeat}</TableCell>
                  <TableCell sx={{ color: "white" }}>{busDetail && busDetail.availableSeat}</TableCell>
                  <TableCell sx={{ color: "white" }}>{busDetail && busDetail.departureTime}</TableCell>

                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item md={6} sx={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: "100px",
            }}
          >
            <Typography
              sx={{
                fontSize: "30px",
                fontWeight: "600",
                paddingBottom: "40px",
              }}
            >
              Book your seat
            </Typography>
            <div
              style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}
            >
              {seatIcons} 
            </div>
            <Typography
              sx={{ fontSize: "20px", fontWeight: "600", paddingTop: "40px" }}
            >
              Seat No. : <span>{seatNo ? seatNo : null}</span>
            </Typography>
            <div style={{ paddingTop: "30px" }}>
              <Button sx={{ backgroundColor: "green", color: "white" }} onClick={handleBooking}>
                confirm booking
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
}
    </div>
            
  )
}
