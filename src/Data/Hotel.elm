module Data.Hotel exposing (hotelAddress, hotelName)

import Data.Bookings exposing (Booking)


hotelAddress : Booking -> List String
hotelAddress booking =
    booking.product.details.address


hotelName : Booking -> String
hotelName booking =
    booking.product.details.propertyName
