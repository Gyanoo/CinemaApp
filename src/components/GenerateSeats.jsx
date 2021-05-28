import Seat from "./Seat";
import { Corridor } from "../styled";

export default function GenerateSeats(props) {
    let result = [];
    let seatIndex = 0;
    for (let y = 0; y < 7; y++) {
        for (let x = 0; x < 15; x++) {
            if (
                x === 5 ||
                x === 10 ||
                (y === 3 && x >= 5) ||
                (x < 2 && y < 3)
            ) {
                result.push(<Corridor />);
            } else if (
                seatIndex >= props.firstChosenSeatIndex &&
                seatIndex <
                    props.firstChosenSeatIndex + props.numberOfChosenSeats
            ) {
                result.push(
                    <Seat
                        key={`${x}:${y}`}
                        seatRow={y}
                        seatCol={x}
                        seatInfo={props.seats[seatIndex++]}
                        chooseSeat={props.chooseSeat}
                        unchooseSeat={props.unchooseSeat}
                        isChosen={true}
                    />
                );
            } else {
                result.push(
                    <Seat
                        key={`${x}:${y}`}
                        seatRow={y}
                        seatCol={x}
                        seatInfo={props.seats[seatIndex++]}
                        chooseSeat={props.chooseSeat}
                        unchooseSeat={props.unchooseSeat}
                        isChosen={false}
                    />
                );
            }
        }
    }
    return result;
}
