module Page.Error exposing (view) 

import Element exposing (Element, centerX, centerY, column, padding, paragraph, spacing, text, rgb255)
import Element.Font as Font

view : String -> Element msg 
view errorMessage =
        column
        [ centerX
        , centerY
        , padding 50
        , spacing 20
        , Font.color <| rgb255 255 255 255
        ]
        [ paragraph [ centerX ] [ text "Unfortunately, something went wrong:" ]
        , paragraph [ centerX ] [ text errorMessage]
        ]