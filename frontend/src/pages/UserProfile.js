import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { userTicketAction } from "../redux/features/userTicketDeatures"

export default function UserProfile() {
  const dispatch = useDispatch()
  const userTicket = useSelector((state) => state.userTicket)
  const { ticket, error, loading } = userTicket

  const userLogin = useSelector((state) => state.userLogin)
  const { user } = userLogin

  const navigate = useNavigate()

  const id = user && user._id

  React.useEffect(() => {
    dispatch(userTicketAction(id))
    if(!user){
      navigate('/login')
    }
  }, [dispatch, id])
  return (
    <div>
      <Grid container>
        <Grid item md={2}>
          <div style={{ paddingTop: "30px" }}>
            <Typography sx={{ fontWeight: "600" }}>
              Name : <span>{user && user.name}</span>
            </Typography>
            <Typography sx={{ fontWeight: "600" }}>
              Age : <span>{user && user.age}</span>
            </Typography>
            <Typography sx={{ fontWeight: "600" }}>
              Phone number : <span>{user && user.phoneNumber}</span>
            </Typography>
            <Link
              to={"/create/ticket"}
              style={{
                paddingTop: "30px",
                textDecoration: "none",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button sx={{ backgroundColor: "green", color: "white" }}>
                create ticket
              </Button>
            </Link>
          </div>
        </Grid>

        <Typography
          sx={{
            textAlign: "center",
            fontSize: "25px",
            fontWeight: "600",
            paddingBottom: "20px",
            paddingTop: "20px",
          }}
        >
          Your Details Bus ticket
        </Typography>
        {ticket &&
          ticket.map((tick) => (
            <Grid item md={10} sx={{ width: "100%" }} key={tick._id}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "600" }}>Bus id</TableCell>
                      <TableCell sx={{ fontWeight: "600" }}>user Id</TableCell>
                      <TableCell sx={{ fontWeight: "600" }}>Seat No.</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{tick.bus}</TableCell>
                      <TableCell>{tick.user}</TableCell>
                      <TableCell>{tick.seatNumber}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          ))}
      </Grid>
    </div>
  )
}
