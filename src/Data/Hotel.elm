module Data.Hotel exposing (additions, address, cancellationPolicy, checkInDate, checkOutDate, email, name, roomType, telephone, totalCost)

import Data.Bookings exposing (Booking, SubProduct, subProduct)


type alias HotelBookingDetails =
    -- This type alias is unused, but this is everything that we currently use for hotels. TODO: Sort out decoding into travel types more sensibly -Nimmo
    { id : String
    , address : List String
    , name : String
    , email : String
    , telephone : String
    , checkInDate : String
    , checkOutDate : String
    , roomType : String
    , additions : Maybe (List String)
    , totalCost : String
    }


address : Booking -> List String
address booking =
    case booking.product.details.address of
        Just hotelAddress ->
            hotelAddress

        Nothing ->
            [ "Address not recorded" ]


name : Booking -> String
name booking =
    case booking.product.details.propertyName of
        Just propertyName ->
            propertyName

        Nothing ->
            "Unknown"


email : Booking -> String
email booking =
    case booking.product.details.emailAddress of
        Just emailAddress ->
            emailAddress

        Nothing ->
            "Not recorded"


telephone : Booking -> String
telephone booking =
    case booking.product.details.telephone of
        Just phoneNumber ->
            phoneNumber

        Nothing ->
            "Not recorded"


checkInDate : Booking -> String
checkInDate booking =
    case booking.product.details.checkInDate of
        Just date ->
            date

        Nothing ->
            "Check-in date not recorded"


checkOutDate : Booking -> String
checkOutDate booking =
    case booking.product.details.checkOutDate of
        Just date ->
            date

        Nothing ->
            "Check-out date not recorded"


roomType : Booking -> String
roomType booking =
    case subProduct booking of
        Just subProd ->
            case subProd.details.roomType of
                Just room ->
                    room

                Nothing ->
                    "No room type specified"

        Nothing ->
            "No room type specified"


additions : Booking -> List String
additions booking =
    case subProduct booking of
        Just subProd ->
            case subProd.bookingDetails.additions of
                Just additionsList ->
                    if List.length additionsList > 0 then
                        additionsList

                    else
                        [ "None" ]

                Nothing ->
                    [ "None" ]

        Nothing ->
            [ "None" ]


totalCost : Booking -> String
totalCost booking =
    case subProduct booking of
        Just subProd ->
            case subProd.details.roomRate of
                Just roomRate ->
                    roomRate.preferred.amount
                        ++ " "
                        ++ roomRate.preferred.currency

                Nothing ->
                    "No total cost recorded"

        Nothing ->
            "No total cost recorded"


cancellationPolicy : Booking -> String
cancellationPolicy booking =
    case subProduct booking of
        Just subProd ->
            case subProd.details.cancelAmendTerms of
                Just terms ->
                    terms

                Nothing ->
                    "No cancellation policy recorded"

        Nothing ->
            "No cancellation policy recorded"
