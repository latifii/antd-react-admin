import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Attachment } from "../../apis/types";


export interface MailType {
    id: number;
    key: number;
    sender: string;
    email: string;
    subject: string;
    message: string;
    time: string;
    tag: string;
    isRead: boolean;
    starred: boolean;
    attachments?: Attachment[]
};

interface MailState {
    activeMail: MailType | null;
    mailCollapse: boolean;
}

const initialState: MailState = {
    activeMail: null,
    mailCollapse: true,
}

const mailSlice = createSlice({
    name: 'mailSlice',
    initialState,
    reducers: {
        storeActiveMail: (state, action: PayloadAction<MailType | null>) => {
            state.activeMail = action.payload;
        },
        toggleMailCollapse: (state, action: PayloadAction<boolean>) => {
            state.mailCollapse = action.payload;
        },
    }
})

export const {
    storeActiveMail,
    toggleMailCollapse
} = mailSlice.actions;

export default mailSlice.reducer;