import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UpcomingCalendar from './pages/UpcomingCalendar';
import FlightDetail from './pages/FlightDetail';
import HotelDetail from './pages/HotelDetail';
import TrainDetail from './pages/TrainDetail';
import TravelcardDetail from './pages/TravelcardDetail';
import VehicleDetail from './pages/VehicleDetail';
import Logout from './pages/Logout';

const App =
  () => (
    <div className="App">
      <Switch>
        <Route exact path="/" component={UpcomingCalendar} />
        <Route path="/upcoming-calendar" component={UpcomingCalendar} />
        <Route path="/flight-detail/:bookingID" component={FlightDetail} />
        <Route path="/hotel-detail/:bookingID" component={HotelDetail} />
        <Route path="/train-detail/:bookingID" component={TrainDetail} />
        <Route path="/travelcard-detail/:bookingID" component={TravelcardDetail} />
        <Route path="/carhire-detail/:bookingID" component={VehicleDetail} />
        <Route path="/log-out" component={Logout} />
      </Switch>
    </div>);

export default App;
