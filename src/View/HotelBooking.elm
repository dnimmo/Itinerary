module View.HotelBooking exposing (view)

import Data.Bookings exposing (Booking, bookingReference)
import Data.Hotel as Hotel
import Element exposing (Element, centerX, column, fillPortion, link, padding, paragraph, rgb255, row, spacing, text, width, centerX)
import Element.Background as Background
import Element.Font as Font
import Element.Region exposing (heading)
import Util.Date exposing (dayAsNumber, monthAsString)


headingStyles : List (Element.Attribute msg)
headingStyles =
    [ heading 2
    , Font.heavy
    ]


columnStyles : List (Element.Attribute msg)
columnStyles =
    [ spacing 5 ]


title : String -> Element msg
title titleText =
    paragraph headingStyles [ text titleText ]


datesOfStay : Booking -> String
datesOfStay booking =
    if (monthAsString <| Hotel.checkInDate booking) == (monthAsString <| Hotel.checkOutDate booking) then
        dayAsNumber (Hotel.checkInDate booking)
            ++ " - "
            ++ dayAsNumber
                (Hotel.checkOutDate booking)
            ++ " of "
            ++ monthAsString (Hotel.checkInDate booking)

    else
        dayAsNumber (Hotel.checkInDate booking)
            ++ " of "
            ++ monthAsString (Hotel.checkInDate booking)
            ++ " - "
            ++ dayAsNumber (Hotel.checkOutDate booking)
            ++ " of "
            ++ monthAsString (Hotel.checkOutDate booking)


cancellationPolicyStyles : List (Element.Attribute msg)
cancellationPolicyStyles =
    padding 20 :: (Background.color (rgb255 220 220 220) :: columnStyles)


view : Booking -> List (Element msg)
view booking =
    -- TODO: This view is really going to be common-ish amongst all of the ViewIndividualBooking types. Figure out the best way to share styling amongst all of these views by passing in tuples/records containing the headings and values perhaps?
    [ column
        (heading 1
            :: columnStyles
        )
        [ paragraph
            []
            [ text <| datesOfStay booking
            ]
        , paragraph
            []
            [ text <| "Stay at " ++ Hotel.name booking ]
        ]
    , column columnStyles <|
        title "Address"
            :: (List.map (\addressLine -> text addressLine) <|
                    Hotel.address booking
               )
    , row [ spacing 50 ]
        [ column columnStyles
            [ title "Phone"
            , link [ Font.underline ]
                { url = "tel:" ++ Hotel.telephone booking
                , label = text <| Hotel.telephone booking
                }
            ]
        , column columnStyles
            [ title "Email"
            , link [ Font.underline ]
                { url = "mailto:" ++ Hotel.email booking
                , label = text <| Hotel.email booking
                }
            ]
        ]
    , row [ padding 20 ] []
    , column columnStyles
        [ title "Booking reference"
        , text <| bookingReference booking
        ]
    , column columnStyles
        [ title "Room type"
        , text <| Hotel.roomType booking
        ]
    , column columnStyles <|
        title "Additions"
            :: (List.map (\addition -> text addition) <| Hotel.additions booking)
    , column columnStyles
        [ title "Total cost"
        , text <| Hotel.totalCost booking
        ]
    , column cancellationPolicyStyles
        [ title "Cancellation policy"
        , paragraph [] [ text <| Hotel.cancellationPolicy booking ]
        ]
    , column [ centerX ] 
        [ link [ Font.underline ]
            { url = "https://apps.travel.cloud/Travel.html#/bookings/" ++ booking.id
            , label = text "View this booking in travel.cloud"
            }]
    ]
