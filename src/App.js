import React from "react";
import "./App.css";
import { connect } from "react-redux";
import SeatsFormView from "./components/SeatsFormView";
import ReservationCompletedView from "./components/ReservationCompletedView";
import SeatsView from "./components/SeatsView";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

function App(props) {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/form" />
                    </Route>
                    <Route path="/form">
                        <SeatsFormView />
                    </Route>
                    <Route path="/chooseSeat/:numberOfSeats/:seatsTogether">
                        <SeatsView />
                    </Route>
                    <Route path="/confirm">
                        <ReservationCompletedView />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        seats: state,
    };
};

export default connect(mapStateToProps)(App);
