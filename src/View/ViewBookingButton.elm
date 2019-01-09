module View.ViewBookingButton exposing (view)

import Data.Bookings exposing (Booking)
import Element exposing (Element, htmlAttribute, padding, rgb255, text)
import Element.Border as Border
import Element.Input exposing (button)
import Html.Attributes exposing (id)


view : Booking -> msg -> Element msg
view booking viewBookingMsg =
    button
        [ htmlAttribute <| id <| "button:ViewIndividualBooking:" ++ booking.id
        , Border.color <| rgb255 0 0 0
        , Border.solid
        , Border.width 1
        , padding 10
        ]
        { onPress = Just viewBookingMsg, label = text "More info" }
