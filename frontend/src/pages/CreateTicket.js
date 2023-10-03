import { Button, Container, Grid, TextField, Typography } from "@mui/material"
import React from "react"
import Select from "react-select"
import { stateOptions } from "../utils/helper"
import { useSelector, useDispatch } from "react-redux"
import { createTicketAction } from "../redux/features/createTicketFeatures"

export default function CreateTicket() {
  const [busName, setBusName] = React.useState("")
  const [busNumber, setBusNo] = React.useState("")
  const [departureCity, setDeparture] = React.useState(null)
  const [arriveCity, setDestination] = React.useState(null)
  const [departureTime, setDate] = React.useState("")
  const [price, setPrice] = React.useState("")
  const [totalSeat, setTotalSeat] = React.useState("")
  const [availableSeat, setAvailableSeat] = React.useState("")
  const [busImage, setBusImage] = React.useState("")


  const dispatch = useDispatch()

  const createTicket = useSelector((state) => state.createTicket)
  const { busTicket, error, loading } = createTicket
  

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "green" : "white", // Background color when selected or not
    }),
  }



  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      createTicketAction({
        busName,
        busNumber,
        busImage,
        departureCity:departureCity?.value,
        departureTime,
        availableSeat,
        arriveCity:arriveCity?.value,
        totalSeat,
        price,
      })
    )
    if(busTicket && !error){
        alert('ticket created success')
    }
  }

  return (
    <div>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "30px",
          fontWeight: "600",
          paddingTop: "30px",
          paddingBottom: "30px",
        }}
      >
        Create Bus ticket
      </Typography>
      {error && <p style={{color:'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <Container>
          <Grid container spacing={2}>
            <Grid item md={6} sm={12} xs={12}>
              <TextField
              required
                label='Enter Bus Name'
                variant='outlined'
                type='text'
                value={busName}
                onChange={(e) => setBusName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <TextField
              required
                label='Enter Bus No.'
                variant='outlined'
                type='text'
                value={busNumber}
                onChange={(e) => setBusNo(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <Select
              required
                styles={customStyles}
                placeholder='Select Departure state'
                options={stateOptions}
                type='text'
                value={departureCity}
                onChange={(options)=>setDeparture(options)}
                fullWidth
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <Select
              required
                placeholder='Select destination state'
                options={stateOptions}
                type='text'
                value={arriveCity}
                onChange={(options)=>setDestination(options)}
                fullWidth
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <TextField
              required
                label='Enter Total No. Seats'
                variant='outlined'
                type='text'
                value={totalSeat}
                onChange={(e) => setTotalSeat(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <TextField
              required
                label='Enter Available No. of Seat'
                variant='outlined'
                value={availableSeat}
                onChange={(e) => setAvailableSeat(e.target.value)}
                type='text'
                fullWidth
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <TextField
              required
                label='Enter Price'
                variant='outlined'
                type='text'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <TextField
              required
                variant='outlined'
                type='date'
                fullWidth
                value={departureTime}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <TextField
              required
                variant='outlined'
                type='file'
                value={busImage}
                onChange={(e) => setBusImage(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              paddingTop: "30px",
            }}
          >
           {loading ? (
          <Button
            sx={{
              backgroundColor: "green",
              width: "100%",
              color: "white",
              opacity: 0.7
            }}
            type="button"
            disabled
          >
            Creating ticket...
          </Button>
        ) : (
          <Button
            sx={{ backgroundColor: "green", width: "100%", color: "white" }}
            type="submit"
          >
            Create ticket
          </Button>
        )}
          </div>
        </Container>
      </form>
    </div>
  )
}
