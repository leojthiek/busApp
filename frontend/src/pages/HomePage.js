import React from "react"
import Carousel from "../components/Carousel"
import { Box, Button, FormControl, Typography } from "@mui/material"
import Select from "react-select"
import "./HomePage.css"
import BusCard from "../components/BusCard"
import { stateOptions } from "../utils/helper"
import { useDispatch, useSelector } from "react-redux"
import { findBusesAction } from "../redux/features/findBusesFeatures"

export default function HomePage() {
  const [departureCity, setDeparture] = React.useState(null)
  const [arriveCity, setDestination] = React.useState(null)
  const [departureTime, setDate] = React.useState("")

  const dispatch = useDispatch()

  const findBuses = useSelector((state)=> state.findBuses)
  const {buses,error,loading} = findBuses

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "green" : "white",
    }),
  }

  const handleSubmit = (e) =>{
     e.preventDefault()
     dispatch(findBusesAction({departureCity:departureCity?.value,arriveCity:arriveCity?.value,departureTime}))
  }

  return (
    <div>
      <Carousel />
      <div className='formMain'>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "30px",
            fontSize: "1.90rem",
            fontWeight: "600",
            fontFamily: "sans-serif",
            color: "white",
            paddingTop: "50px",
          }}
        >
          Find your Bus
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "30px",
            }}
          >
            <Select
              id='locationSelect'
              options={stateOptions}
              placeholder='select location from'
              value={departureCity}
              onChange={(options) => setDeparture(options)}
              styles={customStyles}
            />
            <Select
              options={stateOptions}
              placeholder='Select location to'
              value={arriveCity}
              onChange={(options) => setDestination(options)}
              styles={customStyles}

            />
            <input
              type='date'
              placeholder='Enter date'
              className='select'
              value={departureTime}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormControl>
          <Box
            sx={{
              paddingTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              sx={{ width: "20rem", backgroundColor: "green", color: "white" }} type="submit"
            >
              find buses
            </Button>
          </Box>
        </form>
        <div style={{ paddingTop: "100px" }}>
          <BusCard buses={buses} error={error} loading={loading}/>
        </div>
      </div>
    </div>
  )
}
