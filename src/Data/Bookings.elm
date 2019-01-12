module Data.Bookings exposing
    ( Booker
    , Booking
    , BookingsResponse
    , SubProduct
    , TravelType(..)
    , bookingReference
    , bookingsResponseDecoder
    , includesValidBookings
    , subProduct
    )

import Json.Decode as Decode exposing (Decoder, int, list, maybe, nullable, string)
import Json.Decode.Pipeline exposing (optional, required)


type TravelType
    = Hotel
    | Flight



-- TODO : There are multiple `String`s in here that probably ought to be a custom type


type alias BookingResult =
    { count : Int
    , items : List Booking
    }


type alias Booker =
    { emailAddress : String
    , firstName : String
    , lastName : String
    }


type alias Cost =
    { amount : String
    , currency : String
    }


type alias CostInfo =
    { preferred : Cost
    }


type alias SubProductBookingDetails =
    { additions : Maybe (List String)
    }


type alias SubProductDetails =
    { cancelAmendTerms : Maybe String
    , roomRate : Maybe CostInfo
    , roomType : Maybe String
    }


type alias SubProduct =
    -- This probably only reflects what we're doing for Hotels
    -- Every booking has a `SubProduct` - but only one, and it's an array
    { bookingDetails : SubProductBookingDetails
    , details : SubProductDetails
    , reference : String
    }


type alias ProfileImage =
    { urls : List String }


type alias ProductDetails =
    -- TODO since these are _all_ maybes, perhaps we need a custom type for the different product details, and then decode into the correct type based on the booking type
    { address : Maybe (List String)
    , checkInDate : Maybe String
    , checkOutDate : Maybe String
    , emailAddress : Maybe String
    , profileImage : Maybe ProfileImage
    , propertyName : Maybe String
    , telephone : Maybe String
    }


type alias FlightSegmentLocation =
    { code : String
    , countryCode : String
    , name : String
    }


type alias FlightSegmentPoint =
    { dateTime : String
    , location : FlightSegmentLocation
    }


type alias AirlineDetails =
    { code : String
    , name : String
    }


type alias FlightPackageDetails =
    { name : String }


type alias BaggageAllowanceDetails =
    { pieces : Int
    , weight : Int
    }


type alias FlightSegment =
    { arrive : FlightSegmentPoint
    , depart : FlightSegmentPoint
    , travelTimeMinutes : Int
    , operatingAirline : AirlineDetails
    , vendorAirline : AirlineDetails
    , flightNumber : String
    , aircraft : String
    , package : FlightPackageDetails
    , baggageAllowance : BaggageAllowanceDetails
    }


type alias FlightDetails =
    { segments : List FlightSegment
    }


type alias Product =
    { details : ProductDetails
    , subProducts : List SubProduct
    , travelType : TravelType
    , flights : Maybe (List FlightDetails)
    }


type alias Booking =
    { booker : Booker
    , id : String
    , product : Product
    , status : String
    }


type alias BookingsResponse =
    { items : List Booking }



-- Decoders


profileImageDecoder : Decoder ProfileImage
profileImageDecoder =
    Decode.succeed ProfileImage
        |> required "urls" (list string)


productDetailsDecoder : Decoder ProductDetails
productDetailsDecoder =
    Decode.succeed ProductDetails
        |> optional "address" (nullable (list string)) Nothing
        |> optional "checkInDate" (nullable string) Nothing
        |> optional "checkOutDate" (nullable string) Nothing
        |> optional "emailAddress" (nullable string) Nothing
        |> optional "profileImage" (nullable profileImageDecoder) Nothing
        |> optional "propertyName" (nullable string) Nothing
        |> optional "telephone" (nullable string) Nothing


subProductBookingDetailsDecoder : Decoder SubProductBookingDetails
subProductBookingDetailsDecoder =
    Decode.succeed SubProductBookingDetails |> optional "additions" (maybe (list string)) Nothing


costDecoder : Decoder Cost
costDecoder =
    Decode.succeed Cost
        |> required "amount" string
        |> required "currency" string


costInfoDecoder : Decoder CostInfo
costInfoDecoder =
    Decode.succeed CostInfo
        |> required "preferred" costDecoder


subProductDetailsDecoder : Decoder SubProductDetails
subProductDetailsDecoder =
    Decode.succeed SubProductDetails
        |> optional "cancelAmendTerms" (nullable string) Nothing
        |> optional "roomRate" (nullable costInfoDecoder) Nothing
        |> optional "roomType" (nullable string) Nothing


subProductDecoder : Decoder SubProduct
subProductDecoder =
    Decode.succeed SubProduct
        |> required "bookingDetails" subProductBookingDetailsDecoder
        |> required "details" subProductDetailsDecoder
        |> required "reference" string


travelTypeDecoder : Decoder TravelType
travelTypeDecoder =
    Decode.string
        |> Decode.andThen
            (\x ->
                case x of
                    "FLIGHT" ->
                        Decode.succeed Flight

                    "HOTEL" ->
                        Decode.succeed Hotel

                    unknownTravelType ->
                        Decode.fail <| "Unknown travel type: " ++ unknownTravelType
            )


segmentPointDecoder : Decoder FlightSegmentPoint
segmentPointDecoder =
    Decode.succeed FlightSegmentPoint
        |> required "dateTime" string
        |> required "location"
            (Decode.succeed FlightSegmentLocation
                |> required "code" string
                |> required "countryCode" string
                |> required "name" string
            )


segmentDecoder : Decoder FlightSegment
segmentDecoder =
    Decode.succeed FlightSegment
        |> required "arrive" segmentPointDecoder
        |> required "depart" segmentPointDecoder
        |> required "travelTimeMinutes" int
        |> required "operatingAirline"
            (Decode.succeed AirlineDetails
                |> required "code" string
                |> required "name" string
            )
        |> required "vendorAirline"
            (Decode.succeed AirlineDetails
                |> required "code" string
                |> required "name" string
            )
        |> required "flightNumber" string
        |> required "aircraft" string
        |> required "package"
            (Decode.succeed FlightPackageDetails
                |> required "name" string
            )
        |> required "baggageAllowance"
            (Decode.succeed BaggageAllowanceDetails
                |> required "pieces" int
                |> required "weight" int
            )


flightDetailsDecoder : Decoder FlightDetails
flightDetailsDecoder =
    Decode.succeed FlightDetails
        |> required "segments" (list segmentDecoder)


productDecoder : Decoder Product
productDecoder =
    Decode.succeed Product
        |> required "details" productDetailsDecoder
        |> required "subProducts" (list subProductDecoder)
        |> required "travelType" travelTypeDecoder
        |> optional "flights" (nullable (list flightDetailsDecoder)) Nothing


bookerDecoder : Decoder Booker
bookerDecoder =
    Decode.succeed Booker
        |> required "emailAddress" string
        |> required "firstName" string
        |> required "lastName" string


bookingDecoder : Decoder Booking
bookingDecoder =
    Decode.succeed Booking
        |> required "booker" bookerDecoder
        |> required "id" string
        |> required "product" productDecoder
        |> required "status" string


bookingsResponseDecoder : Decoder BookingsResponse
bookingsResponseDecoder =
    Decode.succeed BookingsResponse
        |> required "items" (Decode.list bookingDecoder)



--


subProduct : Booking -> Maybe SubProduct
subProduct booking =
    List.head booking.product.subProducts


includesValidBookings : BookingsResponse -> Bool
includesValidBookings bookings =
    List.length bookings.items > 0


bookingReference : Booking -> String
bookingReference booking =
    -- Note: This is where you get the reference for hotels, if it turns out that this isn't common across all booking types, move this to Data.Hotel
    case subProduct booking of
        Just subProd ->
            subProd.reference

        Nothing ->
            "No reference recorded"
