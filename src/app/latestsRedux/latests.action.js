import { SETLATEST } from "./latests.types";

export const setLatest = (latest) => {
    return {
        type: SETLATEST,
        payload: latest,
    };
};
