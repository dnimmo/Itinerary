module Data.Hotel exposing (additions, address, checkInDate, email, name, roomType, telephone)

import Data.Bookings exposing (Booking, SubProduct)


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


subProduct : Booking -> Maybe SubProduct
subProduct booking =
    List.head booking.product.subProducts


roomType : Booking -> String
roomType booking =
    case subProduct booking of
        Just subProd ->
            subProd.details.roomType

        Nothing ->
            "No room type specified"


additions : Booking -> List String
additions booking =
    case subProduct booking of
        Just subProd ->
            if List.length subProd.bookingDetails.additions > 1 then 
                subProd.bookingDetails.additions 
            else 
            [ "None" ]

        Nothing ->
            [ "None" ]
