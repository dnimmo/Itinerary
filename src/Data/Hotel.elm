module Data.Hotel exposing (additions, address, cancellationPolicy, checkInDate, checkOutDate, email, name, roomType, telephone, totalCost)

import Data.Bookings exposing (Booking, SubProduct, subProduct)


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


checkOutDate : Booking -> String
checkOutDate booking =
    booking.product.details.checkOutDate


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
            if List.length subProd.bookingDetails.additions > 0 then
                subProd.bookingDetails.additions

            else
                [ "None" ]

        Nothing ->
            [ "None" ]


totalCost : Booking -> String
totalCost booking =
    case subProduct booking of
        Just subProd ->
            let
                costInfo =
                    subProd.details.roomRate.preferred
            in
            costInfo.amount
                ++ " "
                ++ costInfo.currency

        Nothing ->
            "No total cost recorded"


cancellationPolicy : Booking -> String
cancellationPolicy booking =
    case subProduct booking of 
        Just subProd -> 
            subProd.details.cancelAmendTerms

        Nothing -> 
            "No cancellation policy recorded"
