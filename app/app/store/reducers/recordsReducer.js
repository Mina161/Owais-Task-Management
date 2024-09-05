import { FETCH_RECORDS, FETCH_RECORDS_SUCCESS, FETCH_RECORDS_FAIL } from "../actions/types";

const initialState = {
    isLoading: false,
    isError: false,
    errorMessage: null
};

export default function store(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case FETCH_RECORDS:
            return {
                ...state,
                isLoading: true,
                isError: false,
                errorMessage: null
            };
        case FETCH_RECORDS_SUCCESS:
            return {
                ...state,
                ...payload,
                isLoading: false,
                isError: false,
                errorMessage: null
            };
        case FETCH_RECORDS_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: payload
            };
        default:
            return state;
    }
}