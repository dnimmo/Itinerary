module Page.Error exposing (view) 

import Element exposing (Element, text)

view : String -> Element msg 
view errorMessage =
    text errorMessage