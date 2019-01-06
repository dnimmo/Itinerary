module Data.Hotel exposing (address, email, name, telephone, checkInDate)

import Data.Bookings exposing (Booking)


address : Booking -> List String
address booking =
    booking.product.details.address


name : Booking -> String
name booking =
    booking.product.details.propertyName


email : Booking -> String
email booking =
    booking.product.details.emailAddress


telephone : Booking -> String
telephone booking =
    booking.product.details.telephone


checkInDate : Booking -> String 
checkInDate booking =
  booking.product.details.checkInDate