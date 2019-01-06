module View.ViewBookingButton exposing (view)

import Data.Bookings exposing (Booking)
import Element exposing (Element, htmlAttribute, text)
import Element.Input exposing (button)
import Html.Attributes exposing (id)


view : Booking -> msg -> Element msg
view booking viewBookingMsg =
    button
        [ htmlAttribute <| id <| "button:ViewIndividualBooking:" ++ booking.id ]
        { onPress = Just viewBookingMsg, label = text "More info" }
