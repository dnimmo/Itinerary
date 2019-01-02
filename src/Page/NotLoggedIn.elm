module Page.NotLoggedIn exposing (view)

import Element exposing (Element, centerX, centerY, column, padding, paragraph, spacing, text, rgb255)
import Element.Font as Font

view : Element msg
view =
    column
        [ centerX
        , centerY
        , padding 50
        , spacing 20
        , Font.color <| rgb255 255 255 255
        ]
        [ paragraph [ centerX ] [ text "To find your upcoming bookings, we need you to be logged in." ]
        , paragraph [ centerX ] [ text "Please wait to be re-directed to our login page." ]
        ]
