module View.Header exposing (view)

import Element exposing (Element, alignRight, centerX, el, fill, htmlAttribute, mouseOver, padding, rgb255, row, spacing, text, width)
import Element.Background exposing (color)
import Element.Border as Border
import Element.Font as Font
import Element.Input exposing (button)
import Html.Attributes exposing (id)


refreshButton : Element msg
refreshButton =
    text "Refresh"


logOutButton : Element msg
logOutButton =
    text "Log Out"


buttonStyles : String -> List (Element.Attribute msg)
buttonStyles buttonId =
    [ htmlAttribute <| id buttonId
    , alignRight
    , Border.color <| rgb255 0 173 238
    , Border.width 2
    , padding 5
    , mouseOver [ color <| rgb255 0 173 238 ]
    ]


view : msg -> Element msg
view refreshMsg =
    row
        [ color <| rgb255 0 134 183
        , padding 20
        , spacing 10
        , width fill
        , Font.color <| rgb255 255 255 255
        ]
        [ button
            (buttonStyles "button:Refresh")
            { onPress = Just refreshMsg, label = refreshButton }
        , button
            (buttonStyles "button:LogOut")
            { onPress = Nothing, label = logOutButton }
        ]
