import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface LatestNotificationType {
    id: null | number;
    time: null | string;
}
interface StorageState {
    data: unknown;
    collapse: boolean;
    latestNotification: LatestNotificationType;
}

const initialState: StorageState = {
    data: null,
    collapse: false,
    latestNotification: {
        id: null,
        time: null
    }
};

const storageSlice = createSlice({
    name: 'storageSlice',
    initialState,
    reducers: {
        storeData: (state, action: PayloadAction<null | unknown>) => {
            state.data = action.payload;
        },
        menuCollapse: (state, action: PayloadAction<boolean>) => {
            state.collapse = action.payload;
        },
        updateLatestNotification: (state, action: PayloadAction<LatestNotificationType>) => {
            state.latestNotification = action.payload;
        }
    }
});

export const {
    storeData,
    menuCollapse,
    updateLatestNotification
} = storageSlice.actions;

export default storageSlice.reducer;
