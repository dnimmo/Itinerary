module Page.IndividualBooking exposing (view)

import Data.Bookings exposing (Booking)
import Element exposing (Element, centerX, centerY, column, fill, fillPortion, padding, rgb255, row, spacing, text, width)
import Element.Background as Background
import Element.Font as Font
import Element.Input exposing (button)
import Element.Region exposing (heading)
import View.HotelBooking as HotelBooking


view : Booking -> Element msg
view booking =
    row
        [ centerX
        , centerY
        , width fill
        ]
        [ column [ width <| fillPortion 1 ] []
        , column
            [ Background.color <| rgb255 255 255 255
            , padding 50
            , spacing 20
            , width <| fillPortion 8
            ]
            (if booking.product.travelType == "HOTEL" then
                HotelBooking.view booking

             else
                [ text "travel type not implemented" ]
            )
        , column [ width <| fillPortion 1 ] []
        ]
