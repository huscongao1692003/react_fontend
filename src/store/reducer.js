import { SET_VALUE_INPUT_GLOBAL } from './constants'

const initState = {
    data: {},
    search: '',
}

function reducer(state, action) {
    console.log("test: " + (action.type === SET_VALUE_INPUT_GLOBAL));
    switch (action.type) {
        
        case SET_VALUE_INPUT_GLOBAL:
            let value;
            console.log("setting value: " + action.payload + ", " + parseInt(action.payload.substring(2)));
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
        default:
            throw new Error("Unknown action typehttp://localhost:3000/course-list: ");
    }
}

export { initState }
export default reducer;