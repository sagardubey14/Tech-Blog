import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    message:{
        msg:'Message',
        time:5,
        showMsg:false,
    },
}

export const noteSlice = createSlice({
    name:'message',
    initialState,
    reducers:{
        setMsg: (state, action) => {
            state.message = action.payload;
            console.log(state.message);
        },
        setTimeLeft: (state, action) => {
            state.message.time = action.payload;
        },
        setShowMsg: (state, action) => {
            state.message.showMsg = action.payload;
        },
    }

})

export const {setMsg, setTimeLeft, setShowMsg} = noteSlice.actions

export default noteSlice.reducer
