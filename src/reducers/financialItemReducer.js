import {GET_FINANCIAL_ITEM} from "../actions/types";

const initialState = {
    financialItem: null
};

export default function (state=initialState,action) {
    const {type,payload}= action;

    if (type === GET_FINANCIAL_ITEM) {
        return{
            ...state,
            financialItem: payload
        };
    } else {
        return state
    }
}