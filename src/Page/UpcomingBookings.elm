module Page.UpcomingBookings exposing (view)

import Data.Bookings exposing (Booking)
import Html exposing (Html, div, h1, text)


view : Maybe (List Booking) -> Html msg
view upcomingBookings =
    div
        []
        [ h1 [] [ text "My upcoming bookings" ]
        , case upcomingBookings of
            Just bookings ->
                text "Bookings will appear here"

            Nothing ->
                text "You have no upcoming bookings!"
        ]
