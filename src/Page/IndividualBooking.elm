module Page.IndividualBooking exposing (view)

import Data.Bookings exposing (Booking)
import Element exposing (Element, column, fill, text, width)
import Element.Input exposing (button)
import View.HotelBooking as HotelBooking

view : Booking -> Element msg
view booking =
    if booking.product.travelType == "HOTEL" then
        HotelBooking.view booking

    else
        text "travel type not implemented"
