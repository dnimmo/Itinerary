module View.HotelCard exposing (view)

import Data.Bookings exposing (Booking)
import Html exposing (Html, div, h2, p, text)
import Html.Attributes exposing (class)


view : Booking -> Html msg
view booking =
    div [ class "calendar-card" ]
        [ h2 [] [ text <| "Stay at " ++ booking.product.details.propertyName ]
        ]
