import styled from "styled-components";

export const SingleSeat = styled.div`
    width: 50px;
    height: 50px;
    margin: 5px 5px 5px 5px;
    border: 1px solid black;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
    }
`;

export const Corridor = styled.div`
    width: 50px;
    height: 50px;
    margin: 5px 5px 5px 5px;
`;

export const ReservedSeat = styled.div`
    width: 50px;
    height: 50px;
    margin: 5px 5px 5px 5px;
    border: 1px solid black;
    background: #495059;
`;

export const Legend = styled.div`
    width: 50px;
    height: 50px;
    margin: 0 -40px 0 5px;
    border: 1px solid black;
`;
