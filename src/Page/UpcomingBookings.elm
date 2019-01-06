module Page.UpcomingBookings exposing (view)

import Data.Bookings exposing (Booking)
import Element exposing (Element, centerX, column, el, fill, link, padding, paragraph, rgb255, row, spacing, text, width)
import Element.Background as Background
import Element.Font as Font
import View.HotelCard as HotelCard
import Element.Region exposing (heading)


bookingView : Booking -> msg -> Element msg
bookingView booking viewBookingMsg =
    if booking.product.travelType == "HOTEL" then
        HotelCard.view booking viewBookingMsg

    else
        text "travel type not implemented"


noBookingsView : Element msg
noBookingsView =
    column
        [ Font.color <| rgb255 255 255 255
        , width fill
        , padding 30
        , spacing 20
        ]
        [ paragraph []
            [ text "You don't have any upcoming bookings." ]
        , paragraph []
            [ text "Once you book some travel on "
            , link []
                { url = "https://apps.travel.cloud"
                , label = text "travel.cloud"
                }
            , text " your itinerary will appear here."
            ]
        ]


view : Maybe (List Booking) -> (Booking -> msg) -> Element msg
view upcomingBookings viewBookingMsg =
    column
        [ width fill
        , spacing 30
        , padding 20
        ]
        [ paragraph
            [ Font.size 35
            , Font.center
            , Font.color <| rgb255 255 255 255
            , Font.underline
            , heading 1
            ]
            [ text "My upcoming bookings" ]
        , row
            [ centerX
            , width fill
            ]
          <|
            case upcomingBookings of
                Just bookings ->
                    List.map
                        (\x -> bookingView x (viewBookingMsg x))
                        bookings

                Nothing ->
                    [ noBookingsView ]
        ]
