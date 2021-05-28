import { SETLATEST } from "./latests.types";

const INITIAL_STATE = {
    latest: {},
};

const setLatestReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SETLATEST:
            return action.payload;
        default:
            return state;
    }
};

export default setLatestReducer;
