module Page.UpcomingBookings exposing (view)

import Data.Bookings exposing (Booking)
import Html exposing (Html, a, div, h1, p, text)
import Html.Attributes exposing (class, href)
import View.HotelCard as HotelCard


bookingView : Booking -> Html msg
bookingView booking =
    if booking.product.travelType == "HOTEL" then
        HotelCard.view booking

    else
        text "travel type not implemented"


noBookingsView : Html msg
noBookingsView =
    div [ class "calendar-card" ]
        [ p [] [ text "You don't have any upcoming bookings" ]
        , p [ class "detail" ]
            [ text "Once you book some travel on "
            , a [ href "https://apps.travel.cloud" ] [ text "travel.cloud" ]
            , text " your itinerary will appear here."
            ]
        ]


view : Maybe (List Booking) -> Html msg
view upcomingBookings =
    div
        []
        [ h1 [] [ text "My upcoming bookings" ]
        , div [ class "upcoming-calendar" ]
            (case upcomingBookings of
                Just bookings ->
                    bookings |> List.map bookingView

                Nothing ->
                    [ noBookingsView ]
            )
        ]
