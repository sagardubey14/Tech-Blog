import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    failedQueries:[],
    userQueries:[],
    selectedQuery:{},
}

export const querySlice = createSlice({
    name:'query',
    initialState,
    reducers:{
        setQuery:(state, action)=>{
            state.userQueries = action.payload
        },
        setFailedQueries: (state, action) => {
            const newQueries = action.payload;
            newQueries.forEach(query => {
              if (!state.failedQueries.includes(query)) {
                state.failedQueries.push(query);
              }
            });
        },
        setSelectedQuery:(state, action)=>{
            state.selectedQuery = action.payload
        },
    }

})

export const {setQuery, setFailedQueries, setSelectedQuery} = querySlice.actions

export default querySlice.reducer
