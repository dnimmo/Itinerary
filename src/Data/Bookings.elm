module Data.Bookings exposing (Booking)

-- TODO : There are multiple `String`s in here that probably ought to be a custom type


type alias BookingResult =
    { count : Int
    , items : List Booking
    }


type alias Booker =
    { emailAddress : String
    , firstName : String
    , id : String
    , lastName : String
    }


type alias VirtualCardDetails =
    { virtualCard :
        { chargedAmount :
            { amount : String
            , currency : String
            }
        , panHint : String
        , paymentId : String
        }
    }


type PaymentOption
    = VirtualCard VirtualCardDetails


type alias BillingConfiguration =
    { billbackElements :
        { allCosts :
            { enabled : Bool
            , breakfast :
                { enabled : Bool
                }
            , mealSupplement :
                { allowance :
                    { amount : String
                    , currency : String
                    }
                , enabled : Bool
                }
            , parking :
                { enabled : Bool
                }
            , roomRate :
                { enabled : Bool
                }
            , wifi :
                { enabled : Bool
                }
            , type_ : String
            }
        }
    }


type alias ProductDetails =
    { address : List String
    , billingConfiguration : BillingConfiguration
    , checkInDate : String
    , checkOutDate : String
    , countryCode : String
    , emailAddress : String
    , telephone : String
    , type_ : String
    , upc : String
    }


type alias FormOfPayment =
    { associatedCostType : String
    , chargeRoutePlan : Bool
    , creditAccountId : String
    , creditAccountName : String
    , id : String
    , status : String
    , type_ : String
    }


type alias Addition =
    { available : Bool
    , creditAccountRequired : Bool
    , description : String
    , included : Bool
    , type_ : String
    }


type alias Cost =
    { amount : String
    , currency : String
    }


type alias CostInfo =
    { billing : Cost
    , preferred : Cost
    , supplier : Cost
    }


type alias TravellerInfo =
    { emailAddress : String
    , firstName : String
    , guest : Bool
    , hasApisDetails : Bool
    , id : String
    , lastName : String
    , ogranisationId : String
    , organisationName : String
    , passengerAssistanceConfigured : Bool
    , registered : Bool
    , userId : String
    }


type alias SubProduct =
    { bookingDetails :
        { additions : List String
        , flightAdditions : List String
        , passengerAssistanceDeclined : Bool
        , requiredInformation : String
        , requirements : List String
        , specialRequest : String
        , type_ : String
        }
    , channel : String
    , details :
        { additions : List Addition
        , cancelAmendTerms : String
        , estimatedServiceCost : CostInfo
        , features : List String
        , fees : List String
        , information : List String
        , numberOfAdults : Int
        , numberOfChildren : Int
        , prepay : String
        , rateType : String
        , refundable : Bool
        , requirements : List String
        , roomRate : CostInfo
        , roomType : String
        , rules : List String
        , seatReservations : List String
        , sentLoyaltySchemes : List String
        , surcharges : List String
        , totalEstimatedCost : CostInfo
        , type_ : String
        }
    , id : String
    , notes : List String
    , pin : String
    , policyComplianceState : String
    , reference : String
    , sfsProductId : String
    , sfsReference : String
    , supplierReference : String
    , ticketNumbers : List String
    , traveller : TravellerInfo
    }


type alias Product =
    { bookingDetails :
        { billbackOverrides : List String
        , billingConfiguration : { selected : String }
        , type_ : String
        }
    , createdDate : String
    , details : ProductDetails
    , formOfPayment : FormOfPayment
    , id : String
    , searchId : String
    , serviceDate : String
    , status : String
    , subProducts : List SubProduct
    , travelType : String
    }


type alias Booking =
    { booker : Booker
    , cancellable : Bool
    , confirmedDate : String
    , createdDateTime : String
    , id : String
    , paidWithVouchers : Bool
    , payments : PaymentOption
    , product : Product
    , refundable : Bool
    , serviceDate : String
    , status : String
    }
