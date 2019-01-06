module View.HotelBooking exposing (view)

import Data.Bookings exposing (Booking, bookingReference)
import Data.Hotel as Hotel
import Element exposing (Element, centerX, centerY, column, padding, paragraph, rgb255, spacing, text)
import Element.Background as Background
import Element.Font as Font
import Element.Region exposing (heading)


headingStyles : List (Element.Attribute msg)
headingStyles =
    [ heading 2
    , Font.heavy
    ]


title : String -> Element msg
title titleText =
    paragraph headingStyles [ text titleText ]


view : Booking -> Element msg
view booking =
    column
        [ centerX
        , centerY
        , padding 50
        , spacing 20
        , Background.color <| rgb255 255 255 255
        ]
        [ column []
            [ paragraph
                [ centerX
                , heading 1
                ]
                [ text <| "Stay at " ++ Hotel.name booking ]
            ]
        , column []
            [ title "Booking reference"
            , text <| bookingReference booking
            ]
        , column [] <|
            title "Address"
                :: (List.map (\addressLine -> text addressLine) <|
                        Hotel.address booking
                   )
        ]
