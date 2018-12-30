module Page.Error exposing (view) 

import Html exposing (Html, text)

view : String -> Html msg 
view errorMessage =
    text errorMessage