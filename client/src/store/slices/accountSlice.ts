
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// lay thong tin account
export const getAllAccount =createAsyncThunk("getAllAccount" ,async () => {
    try {
        const res = await axios.get("http://localhost:8080/user");
        return res.data
    } catch (error) {
        console.log(error);
    }
} ) 



const account  = createSlice({
    name:"account",
    initialState:{
        users : []
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(getAllAccount.fulfilled,(state , action) => {
            return state.users = action.payload
        })
    }
})

export default account.reducer