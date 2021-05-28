import { connect } from "react-redux";

function ReservationCompletedView(props) {
    return (
        <div style={{ textAlign: "left" }} className="container">
            <h1>Twoja rezerwacja przebiegła pomyślnie!</h1>
            <br />
            <h5>Wybrałeś miejsca:</h5>
            {!props.latest.latest.hasOwnProperty("latest") &&
                props.latest.latest.map((seat) => {
                    return (
                        <p
                            key={seat.id}
                        >{`- rząd ${seat.cords.x}, miejsce ${seat.cords.y} (${seat.id})`}</p>
                    );
                })}
            <br />
            <h3>
                Dziękujemy! W razie problemów prosimy o kontakt z działem
                administracji.
            </h3>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        latest: state,
    };
};

export default connect(mapStateToProps)(ReservationCompletedView);
