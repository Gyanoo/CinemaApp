import { Container } from "react-bootstrap";
import { Legend } from "../styled";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { setLatest } from "../app/latestsRedux/latests.action";
import GenerateSeats from "./GenerateSeats";

export const findSubsequentPlaces = (seats, numberOfSeats) => {
    let subsequentPlacesCount = 0;
    let latestsRow = -1;
    let latestsColumn = -1;
    let currentIndex = 0;
    for (let y = 0; y < 7; y++) {
        for (let x = 0; x < 15; x++) {
            if (
                x === 5 ||
                x === 10 ||
                (y === 3 && x >= 5) ||
                (x < 2 && y < 3)
            ) {
                subsequentPlacesCount = 0;
                latestsRow = -1;
                latestsColumn = -1;
            } else {
                if (seats[currentIndex]?.reserved) {
                    latestsRow = -1;
                    latestsColumn = -1;
                    subsequentPlacesCount = 0;
                } else if (
                    latestsRow === seats[currentIndex].cords.x &&
                    latestsColumn === seats[currentIndex].cords.y - 1
                ) {
                    subsequentPlacesCount++;
                    latestsColumn++;
                } else if (
                    latestsRow === seats[currentIndex].cords.x &&
                    latestsColumn !== seats[currentIndex].cords.y - 1
                ) {
                    subsequentPlacesCount = 1;
                    latestsColumn = seats[currentIndex].cords.y;
                } else if (latestsRow !== seats[currentIndex].cords.x) {
                    latestsColumn = seats[currentIndex].cords.y;
                    latestsRow = seats[currentIndex].cords.x;
                    subsequentPlacesCount = 1;
                }
                currentIndex++;
            }
            if (subsequentPlacesCount === numberOfSeats) {
                return currentIndex - numberOfSeats;
            }
        }
    }
    return NaN;
};

const SeatsView = (props) => {
    let { numberOfSeats, seatsTogether } = useParams();
    const [isInInitialState, setIsInInitialState] = useState(
        seatsTogether === "false" ? false : true
    );
    numberOfSeats = parseInt(numberOfSeats);
    const [chosenSeats, setChosenSeats] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [firstSeatsIndex, setFirstSeatsIndex] = useState();
    const [allSeats, setAllSeats] = useState(undefined);
    const history = useHistory();

    useEffect(() => {
        axios("http://127.0.0.1:4000/seats")
            .then((res) => {
                setAllSeats(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        let chosen = [];
        for (
            let i = firstSeatsIndex;
            i < firstSeatsIndex + numberOfSeats;
            i++
        ) {
            chosen.push(allSeats[i]);
        }
        setChosenSeats(chosen);
    }, [allSeats]);

    if (isInInitialState && allSeats !== undefined) {
        setFirstSeatsIndex(findSubsequentPlaces(allSeats, numberOfSeats));
        if (firstSeatsIndex === -1) {
            setErrorMessage(
                `Nie udało się wybrać ${numberOfSeats} miejsc obok siebie. Wybierz miejsca ręcznie`
            );
        }
        setIsInInitialState(false);
    }

    const chooseSeat = (seat) => {
        setChosenSeats([...chosenSeats, seat]);
    };

    const unchooseSeat = (seat) => {
        setChosenSeats(
            chosenSeats.filter((chosen) => chosen.cords !== seat.cords)
        );
    };

    const handleSubmit = () => {
        if (chosenSeats.length === 0) {
            setErrorMessage("Wybierz przynajmniej jedno miejsce!");
        } else {
            props.setLatest(chosenSeats);
            history.push("/confirm");
        }
    };

    if (allSeats === undefined) {
        return <div></div>;
    }
    return (
        <Container style={{ width: "900px" }}>
            <div style={{ color: "red", fontSize: "1.5em" }}>
                {errorMessage}
            </div>
            <div className="row">
                <GenerateSeats
                    seats={allSeats}
                    chooseSeat={chooseSeat}
                    unchooseSeat={unchooseSeat}
                    firstChosenSeatIndex={firstSeatsIndex}
                    numberOfChosenSeats={numberOfSeats}
                />
            </div>
            <div className="row mt-4" style={{ display: "flex" }}>
                <Legend style={{ background: "#edf6f9" }} className="col-1" />{" "}
                <span className="col-3 mt-3">Miejsca dostępne</span>
                <Legend
                    style={{ background: "#495059" }}
                    className="col-1"
                />{" "}
                <span className="col-3 mt-3 ms-4">Miejsca zarezerwowane</span>
                <Legend
                    style={{ background: "#fca311" }}
                    className="col-1"
                />{" "}
                <span className="col-3 mt-3">Twój wybór</span>
                <Button
                    className="col-2"
                    style={{
                        backgroundColor: "#FFFFFF",
                        color: "#000000",
                        border: "1px solid black",
                    }}
                    onClick={handleSubmit}
                >
                    Rezerwuj
                </Button>
            </div>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        latest: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLatest: (payload) => dispatch(setLatest(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeatsView);