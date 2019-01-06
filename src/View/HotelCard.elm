module View.HotelCard exposing (view)

import Data.Bookings exposing (Booking)
import Data.Hotel as Hotel
import Element exposing (Element, centerX, column, el, fill, fillPortion, padding, paragraph, rgb255, row, spacing, text, width)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Util.Date exposing (dayAsNumber, monthAsString)
import View.ViewBookingButton as ViewBookingButton


view : Booking -> msg -> Element msg
view booking viewBookingMsg =
    row
        [ Background.color <| rgb255 255 255 255
        , centerX
        , width fill
        , spacing 10
        , padding 10
        , Border.color <| rgb255 0 134 183
        , Border.width 2
        ]
        [ column
            [ width <| fillPortion 2
            ]
            [ paragraph
                [ Font.bold
                , Font.center
                ]
                [ text <| dayAsNumber booking.product.details.checkInDate
                , text " of "
                , text <| monthAsString booking.product.details.checkInDate
                ]
            ]
        , column
            [ spacing 10
            , width <| fillPortion 8
            ]
            [ row []
                [ paragraph [ Font.underline ] [ text "Stay at " ] ]
            , row []
                [ paragraph [ Font.bold ] [ text <| Hotel.name booking ] ]
            , row []
                [ text <| "Email: " ++ Hotel.email booking ]
            , row []
                [ text <| "Telephone: " ++ Hotel.telephone booking ]
            , row []
                [ ViewBookingButton.view booking viewBookingMsg ]
            ]
        ]
