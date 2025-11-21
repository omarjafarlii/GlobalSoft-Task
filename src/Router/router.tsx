import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import BookingLayout from "../Layouts/BookingLayout";
import Step1Configuration from "../Pages/Step1Configuration";
import Step2Configuration from "../Pages/Step2Configuration";
import Step3Configuration from "../Pages/Step3Configuration";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<BookingLayout />}>
                <Route path="/" element={<Step1Configuration />} />,
                <Route path="/meals" element={<Step2Configuration />} />,
                <Route path="/summary" element={<Step3Configuration />} />
            </Route>
        </>
    )
)