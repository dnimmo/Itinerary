module Page.LoadingBookings exposing (view)

import Element exposing (Element, centerX, centerY, column, padding, paragraph, rgb255, spacing, text)
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
        [ paragraph [ centerX ] [ text "Loading bookings..." ]
        ]
