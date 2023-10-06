import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    token: '',
    userID: '',
    name: '',
    role: ''
};

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.token = action.payload.token;
            state.userID = action.payload.userID;
            state.name = action.payload.name;
            state.role = action.payload.role;
        },
    },
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;
