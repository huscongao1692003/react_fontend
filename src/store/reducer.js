import { SET_VALUE_INPUT_GLOBAL,
        SET_VALUE_COURSE
} from './constants'

const initState = {
    data: {},
    search: '',
}

function reducer(state, action) {
    switch (action.type) {
        case SET_VALUE_INPUT_GLOBAL:
            let value;
            if (action.payload.substring(0, 2) === "ca") {
                value = {
                    dataType: "category",
                    code: parseInt(action.payload.substring(2))
                };
            } else if (action.payload.substring(0, 2) === "st") {
                value = {
                    dataType: "style",
                    code: parseInt(action.payload.substring(2))
                }
            } else {
                value = {}; 
            }
            
            return {
                ...state,
                data: value,
                search: action.payload,
                
            }
        case SET_VALUE_COURSE:
            console.log("action: ", action.payload);
            return {
                ...state,
                data: action.payload,
            }
        default:
            throw new Error("Unknown action");
    }
}

export { initState }
export default reducer;