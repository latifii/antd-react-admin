import { combineReducers } from "redux";
import storageSlice from "./slices/storageSlice";
import themeSlice from "./slices/themeSlice";
import authSlice from "./slices/authSlice";
import tempSlice from "./slices/tempSlice";
import mailSlice from "./slices/mailSlice";

const rootReducer = combineReducers({
    storageSlice,
    themeSlice,
    authSlice,
    tempSlice,
    mailSlice
})

export default rootReducer