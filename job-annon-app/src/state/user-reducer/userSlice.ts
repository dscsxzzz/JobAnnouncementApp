import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
    jwt: string
    role: string
    data: any
}

const initialState: UserData = {
    jwt: '',
    role: '',
    data: {}
};

const userSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserData>) => {
            return {...state, ...action.payload};
        },
    },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
