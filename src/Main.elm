module Main exposing (main)

import Browser exposing (Document, UrlRequest(..))
import Browser.Navigation as Nav
import Html exposing (Html, br, div, p, text)
import Html.Attributes exposing (class)
import Url exposing (Url)
import View.Header as Header
import Page.UpcomingBookings as UpcomingBookings


-- MODEL


type alias Model =
    { key : Nav.Key
    , state : State
    }


type State
    = NotLoggedIn
    | ViewingUpcomingBookings
    | ViewingIndividualBooking
    | ViewingLogOutOptions



-- UPDATE


type Msg
    = ChangedUrl Url
    | ActivatedLink Browser.UrlRequest


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )



-- VIEW


notLoggedInView =
    div
        [ class "notLoggedInMessage" ]
        [ p
            []
            [ text "To find your upcoming bookings, we need you to be logged in."
            , br [] []
            , text "Please wait to be re-directed to our login page."
            ]
        ]


placeholderView =
    text "Coming soon probably :D"


emptyNode : Html msg
emptyNode =
    text ""


view : Model -> Document Msg
view model =
    { title = "Itinerary, by travel.cloud"
    , body =
        [ case model.state of
            NotLoggedIn ->
                emptyNode

            _ ->
                Header.view
        , case model.state of
            NotLoggedIn ->
                notLoggedInView

            ViewingUpcomingBookings ->
                UpcomingBookings.view

            ViewingIndividualBooking ->
                placeholderView

            ViewingLogOutOptions ->
                placeholderView
        ]
    }



-- INIT


init : () -> Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url navKey =
    update (ChangedUrl url) { key = navKey, state = NotLoggedIn }



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- MAIN


main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlChange = ChangedUrl
        , onUrlRequest = ActivatedLink
        }
