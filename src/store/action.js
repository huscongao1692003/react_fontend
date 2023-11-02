import { SET_VALUE_INPUT_GLOBAL, SEARCH_VALUE_INPUT_GLOBAL } from "./constants";

export const setValueInputGlobal = payload => ({
    type: SET_VALUE_INPUT_GLOBAL,
    payload
});

export const searchValueInputGlobal = payload => ({
    type: SEARCH_VALUE_INPUT_GLOBAL,
    payload
});
