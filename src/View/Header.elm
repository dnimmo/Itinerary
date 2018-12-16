module View.Header exposing (view)

import Html exposing (Html, a, button, div, img)
import Html.Attributes exposing (class, href, src)


view : Html msg
view =
    div
        [ class "toolbar"
        ]
        [ -- TODO: Use actual gravatar icons instead of the default anonymous one
          a
            [ href "/log-out" ]
            [ div
                [ class "icon-exit" ]
                []
            ]
        , button
            [ class "icon-loop2" ]
            []
        , img
            [ src "https://www.gravatar.com/avatar/36a28760443c6b6101bd5d187a101ca0?r=g&s=30&d=mm" ]
            []
        ]
