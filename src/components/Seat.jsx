import { SingleSeat } from "../styled";
import { useState } from "react";
import { ReservedSeat } from "../styled";

export default function Seat(props) {
    const [isClicked, setIsClicked] = useState(props.isChosen);
    const handleClick = () => {
        if (isClicked) {
            props.unchooseSeat(props.seatInfo);
        } else {
            props.chooseSeat(props.seatInfo);
        }
        setIsClicked(!isClicked);
    };

    if (!props.seatInfo) {
        return <span></span>;
    }
    if (props.seatInfo.reserved) {
        return <ReservedSeat />;
    }
    return (
        <SingleSeat
            key={props.seatInfo.id}
            onClick={() => handleClick()}
            style={
                isClicked
                    ? { background: "#fca311" }
                    : { background: "#edf6f9" }
            }
        />
    );
}
