module Util.Date exposing (dayAsNumber, monthAsString)


monthAsString : String -> String
monthAsString date =
    let
        dateArrayTail =
            List.tail <| String.split "-" date

        monthAsNumber =
            case dateArrayTail of
                Just array ->
                    List.head array

                Nothing ->
                    Just "Unkown month"
    in
    case monthAsNumber of
        Just month ->
            if month == "01" then
                "January"

            else if month == "02" then
                "February"
    
            else if month == "03" then
                "March"

            else if month == "04" then
                "April"

            else if month == "05" then
                "May"

            else if month == "06" then
                "June"

            else if month == "07" then
                "July"

            else if month == "08" then
                "August"

            else if month == "09" then
                "September"

            else if month == "10" then
                "October"

            else if month == "11" then
                "November"

            else if month == "12" then
                "December"

            else
                "Unknown month"

        Nothing ->
            "Unknown month"


dayNumberWithSuffix : String -> String
dayNumberWithSuffix dayNumber =
    if
        (dayNumber |> String.endsWith "0")
            || (dayNumber |> String.startsWith "1")
    then
        dayNumber ++ "th"

    else if dayNumber |> String.endsWith "1" then
        dayNumber ++ "st"

    else if dayNumber |> String.endsWith "2" then
        dayNumber ++ "nd"

    else if dayNumber |> String.endsWith "3" then
        dayNumber ++ "rd"

    else
        dayNumber ++ "th"


dayAsNumber : String -> String
dayAsNumber date =
    let
        dateArray =
            String.split "-" date
                |> List.reverse

        firstArrayItem =
            List.head dateArray
    in
    case firstArrayItem of
        Just value ->
            dayNumberWithSuffix value

        Nothing ->
            "Error"
