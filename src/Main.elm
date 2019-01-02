module Main exposing (main)

import Browser exposing (Document, UrlRequest(..))
import Browser.Navigation as Nav
import Data.Bookings exposing (Booking, BookingsResponse, bookingsResponseDecoder, includesValidBookings)
import Element exposing (Element, column, el, fill, layout, rgb255, row, text, width)
import Element.Background as Background
import Html exposing (Html, br, div, p)
import Html.Attributes exposing (class)
import Http
import Page.Error as Error
import Page.NotLoggedIn as NotLoggedIn
import Page.UpcomingBookings as UpcomingBookings
import Url exposing (Url)
import View.Header as Header



-- MODEL


type alias Model =
    { bookings : Maybe (List Booking)
    , key : Nav.Key
    , state : State
    }


type State
    = NotLoggedIn
    | ViewingUpcomingBookings
    | ViewingIndividualBooking
    | ViewingLogOutOptions
    | Failure String



-- UPDATE


type Msg
    = ChangedUrl Url
    | ActivatedLink Browser.UrlRequest
    | LogInSuccess
    | BookingsResultReceived (Result Http.Error BookingsResponse)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LogInSuccess ->
            ( { model
                | state = ViewingUpcomingBookings
              }
            , getBookings
            )

        BookingsResultReceived (Ok bookings) ->
            ( { model
                | bookings =
                    if includesValidBookings bookings then
                        Just bookings.items

                    else
                        Nothing
              }
            , Cmd.none
            )

        BookingsResultReceived (Err err) ->
            ( { model
                | state =
                    Failure <|
                        case err of
                            Http.Timeout ->
                                "Request timed out :("

                            Http.NetworkError ->
                                "Some network error :("

                            Http.BadBody message ->
                                "Bad payload: " ++ message

                            Http.BadStatus _ ->
                                "Bad status"

                            Http.BadUrl _ ->
                                "Bad url"
              }
            , Cmd.none
            )

        _ ->
            ( model, Cmd.none )



-- VIEW


placeholderView : Element msg
placeholderView =
    text "Coming soon probably :D"


emptyNode : Element msg
emptyNode =
    text ""


view : Model -> Document Msg
view model =
    { title = "Itinerary, by travel.cloud"
    , body =
        [ layout
            [ Background.color <| rgb255 0 173 238 ]
          <|
            column
                [ width fill ]
                [ row [ width fill ]
                    [ if model.state /= NotLoggedIn then
                        Header.view

                      else
                        emptyNode
                    ]
                , row [ width fill ]
                    [ case model.state of
                        NotLoggedIn ->
                            NotLoggedIn.view

                        ViewingUpcomingBookings ->
                            UpcomingBookings.view model.bookings

                        ViewingIndividualBooking ->
                            placeholderView

                        ViewingLogOutOptions ->
                            placeholderView

                        Failure errorMessage ->
                            Error.view errorMessage
                    ]
                ]
        ]
    }



-- INIT


init : () -> Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url navKey =
    update LogInSuccess
        { bookings = Nothing
        , key = navKey
        , state = NotLoggedIn
        }



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- MAIN


apiUrl : String
apiUrl =
    "http://localhost:3000/bookings"


getBookings =
    Http.get
        { url = apiUrl
        , expect = Http.expectJson BookingsResultReceived bookingsResponseDecoder
        }


main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlChange = ChangedUrl
        , onUrlRequest = ActivatedLink
        }
