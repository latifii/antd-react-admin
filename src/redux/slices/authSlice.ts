import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
    user: unknown | null;
}

const initialState: InitialState = {
    user: null,
}

const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {
        storeUser: (state, action: PayloadAction<unknown | null>) => {
            return {
                ...state,
                user: action.payload,
            };
        },
        logOut: (state) => {
            state.user = null;
        }
    }
})

export const { storeUser, logOut } = authSlice.actions
export default authSlice.reducer
