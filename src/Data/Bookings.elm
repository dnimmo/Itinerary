module Data.Bookings exposing (Booker, Booking, BookingsResponse, bookingsResponseDecoder)

import Json.Decode as Decode exposing (Decoder, list, string)
import Json.Decode.Pipeline exposing (optional, required)



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
    { additions : List String
    }


type alias SubProductDetails =
    { cancelAmendTerms : String
    , roomRate : CostInfo
    , roomType : String
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
    { address : List String
    , checkInDate : String
    , checkOutDate : String
    , emailAddress : String
    , profileImage : ProfileImage
    , propertyName : String
    , telephone : String
    }


type alias Product =
    { details : ProductDetails
    , subProducts : List SubProduct
    , travelType : String
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
        |> required "address" (list string)
        |> required "checkInDate" string
        |> required "checkOutDate" string
        |> required "emailAddress" string
        |> required "profileImage" profileImageDecoder
        |> required "propertyName" string
        |> required "telephone" string


subProductBookingDetailsDecoder : Decoder SubProductBookingDetails
subProductBookingDetailsDecoder =
    Decode.succeed SubProductBookingDetails |> required "additions" (list string)


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
        |> required "cancelAmendTerms" string
        |> required "roomRate" costInfoDecoder
        |> required "roomType" string


subProductDecoder : Decoder SubProduct
subProductDecoder =
    Decode.succeed SubProduct
        |> required "bookingDetails" subProductBookingDetailsDecoder
        |> required "details" subProductDetailsDecoder
        |> required "reference" string


productDecoder : Decoder Product
productDecoder =
    Decode.succeed Product
        |> required "details" productDetailsDecoder
        |> required "subProducts" (list subProductDecoder)
        |> required "travelType" string


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
