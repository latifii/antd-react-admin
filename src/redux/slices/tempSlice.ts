import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface StorageState {
    settingsDrawer: boolean;
}

const initialState: StorageState = {
    settingsDrawer: false,
};

const tempSlice = createSlice({
    name: 'tempSlice',
    initialState,
    reducers: {
        toggleSettingsDrawer: (state, action: PayloadAction<boolean>) => {
            state.settingsDrawer = action.payload;
        },
    }
});

export const {
    toggleSettingsDrawer
} = tempSlice.actions;

export default tempSlice.reducer;