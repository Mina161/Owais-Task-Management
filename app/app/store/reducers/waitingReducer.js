import { WAIT, WAIT_SUCCESS, WAIT_FAIL } from "../actions/types";

const initialState = {
    isLoading: false,
    isError: false,
    data: null
};

export default function store(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case WAIT:
            return {
                ...state,
                isLoading: true,
            };
        case WAIT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: payload
            };
        case WAIT_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true,
                data: payload
            };
        default:
            return state;
    }
}