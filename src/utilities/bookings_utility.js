import moment from 'moment';

const bookingToHotelCard =
  ({ id, product }) => {
    const { details, travelType } = product;
    const { checkInDate, checkOutDate, propertyName, address, telephone } = details;
    const days = (moment(checkOutDate).diff(moment(checkInDate), 'days'));
    return Array.from(Array(days).keys()).map(nightnum => ({
      id,
      propertyName,
      date: moment(checkInDate).add(nightnum, 'd').endOf('day').format(),
      checkInDate,
      checkOutDate,
      address: address.join(', '),
      night: nightnum + 1,
      nights: days,
      cardId: moment(checkInDate).endOf('month'),
      telephone,
      travelType,
      unique: `${id}${nightnum}`,
      dayNumber: moment(checkInDate).add(nightnum, 'd').format('Do'),
    }));
  };

const bookingToFlightCard =
  ({ id, product }) => {
    const { details, travelType } = product;
    const { flights } = details;
    return flights.map(({ segments }, index) => ({
      id,
      depart: segments[0].depart.location.name,
      arrive: segments[segments.length - 1].arrive.location.name,
      date: segments[0].depart.dateTime,
      dayNumber: moment(segments[0].depart.dateTime).format('Do'),
      cardId: moment(segments[0].depart.dateTime).endOf('month'),
      vendor: details.codeshareCarrier.name,
      travelType,
      unique: `${id}${index}`,
    }));
  };

const bookingToTrainCard =
  ({ id, product }) => {
    const { details, travelType } = product;
    const { journeys } = details;
    return journeys.map(({ legs, ticketType }, index) => ({
      id,
      depart: legs[0].depart.location.name,
      arrive: legs[legs.length - 1].arrive.location.name,
      date: legs[0].depart.dateTime,
      dayNumber: moment(legs[0].depart.dateTime).format('Do'),
      cardId: moment(legs[0].depart.dateTime).endOf('month'),
      ticketType: ticketType.name,
      travelType,
      unique: `${id}${index}`,
    }));
  };

const bookingToVehicleCard =
  ({ id, product }) => {
    const { travelType, serviceDate } = product;
    return [{
      id,
      pickUpLocation: product.details.pickUp.location.name,
      dropOffLocation: product.details.dropOff.location.name,
      rentalCompanyName: product.subProducts[0].details.vendor,
      cardId: moment(serviceDate).endOf('month'),
      date: product.details.pickUp.dateTime,
      action: 'PICK-UP',
      dayNumber: moment(product.details.pickUp.dateTime).format('Do'),
      model: product.subProducts[0].details.model,
      travelType,
      unique: `${id}PICK-UP`,
    }, {
      id,
      pickUpLocation: product.details.pickUp.location.name,
      dropOffLocation: product.details.dropOff.location.name,
      rentalCompanyName: product.subProducts[0].details.vendor,
      cardId: moment(product.details.dropOff.dateTime).endOf('month'),
      date: product.details.dropOff.dateTime,
      action: 'DROP-OFF',
      dayNumber: moment(product.details.dropOff.dateTime).format('Do'),
      model: product.subProducts[0].details.model,
      travelType,
      unique: `${id}DROP-OFF`,
    }];
  };

const bookingToTravelCardCard =
    ({ id, product }) => {
      const { travelType, serviceDate } = product;
      return [{
        id,
        name: product.subProducts[0].details.name,
        date: moment(serviceDate).endOf('day').format(),
        dayNumber: moment(serviceDate).format('Do'),
        cardId: moment(serviceDate).endOf('month'),
        travelType,
        unique: `${id}`,
      }];
    };


const bookingsToCards =
  (bookings) => {
    const cards = bookings.map((booking) => {
      switch (booking.product.travelType) {
        case 'HOTEL':
          return bookingToHotelCard(booking);
        case 'FLIGHT':
          return bookingToFlightCard(booking);
        case 'TRAIN':
          return bookingToTrainCard(booking);
        case 'VEHICLE':
          return bookingToVehicleCard(booking);
        case 'TRAVELCARD':
          return bookingToTravelCardCard(booking);
        default:
          return [];
      }
    }).reduce((list, bookingcards) => list.concat(bookingcards), []);


    const collection = cards.reduce(
      (groups, { cardId, ...noid }) =>
        ({ ...groups, [cardId]: [...groups[cardId] || [], noid] }), []);

    const r = Object.keys(collection).map((key) => {
      const month = moment(new Date(key));
      return {
        month,
        label: month.format('MMMM YYYY'),
        data: collection[key].sort((a, b) => moment(a.date).diff(moment(b.date))),
      };
    });

    return r.sort((a, b) => a.month.diff(b.month));
  };

const FLIGHT_TYPE = {
  RETURN: 'Return',
  ONE_WAY: 'One way',
  MULTI_CITY: 'Multi City',
};

const getFlightType =
    (booking) => {
      const firstFlight = booking.product.details.flights[0];
      const lastFlight =
          booking.product.details.flights[booking.product.details.flights.length - 1];

      if (booking.product.details.flights.length === 1) {
        return FLIGHT_TYPE.ONE_WAY;
      } else if (booking.product.details.flights.length === 2) {
        if (firstFlight.segments[0].depart.location.code ===
                lastFlight.segments[lastFlight.segments.length - 1].arrive.location.code) {
          return FLIGHT_TYPE.RETURN;
        }
        return FLIGHT_TYPE.MULTI_CITY;
      } else if (booking.product.details.flights.length > 2) {
        return FLIGHT_TYPE.MULTI_CITY;
      }

      return FLIGHT_TYPE.ONE_WAY;
    };

export { bookingsToCards, getFlightType, FLIGHT_TYPE };
