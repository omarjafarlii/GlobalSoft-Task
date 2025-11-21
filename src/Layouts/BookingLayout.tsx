import { Outlet } from "react-router"
import Header from "../Components/Header"

const BookingLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default BookingLayout