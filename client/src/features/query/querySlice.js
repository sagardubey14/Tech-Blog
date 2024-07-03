import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    failedQueries:[],
    userQueries:[],
}

export const querySlice = createSlice({
    name:'query',
    initialState,
    reducers:{
        setQuery:(state, action)=>{
            state.userQueries = action.payload
        },
        setFailedQuery:(state, action)=>{
            state.failedQueries.push(action.payload)
        },
    }

})

export const {setQuery, setFailedQuery} = querySlice.actions

export default querySlice.reducer
