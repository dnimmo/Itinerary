module Page.NotLoggedIn exposing (view)

import Html exposing (Html, div, p, text, br)
import Html.Attributes exposing (class)

view : Html msg
view = 
    div
        [ class "notLoggedInMessage" ]
        [ p
            []
            [ text "To find your upcoming bookings, we need you to be logged in."
            , br [] []
            , text "Please wait to be re-directed to our login page."
            ]
        ]