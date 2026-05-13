import * as act from "../types"

const initState = {
    pageChange: {
        url: "/",
        mode: false
    }
}

export const globalReducer = (state= initState, action) => {
    switch (action.type) {
        case act.CHANGE_PAGE:
            if (action.payload.mode === false) {
                return {
                    ...state,
                    pageChange: {
                        url: action.payload.url,
                        mode: false
                    }
                };
            }

            if (state.pageChange.mode) {
                return state;
            }
            if(action.payload.url !== window.location.pathname){
                return {...state, pageChange: {
                    url: action.payload.url,
                    mode: action.payload.mode
                }}
            }
            else 
                return state

        default: return state;
    }
}