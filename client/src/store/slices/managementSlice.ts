import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// lay data
export const getAllData =  createAsyncThunk("getAllData" , async () => {
    try {
        const res = await axios.get(`http://localhost:8080/project`);
        return res.data
    } catch (error) {
        console.log(error);
    }
} )


// them du an
export const addProject = createAsyncThunk("addProject" , async (newProject:any) =>{
    try {
        const res = await axios.post("http://localhost:8080/project",newProject);
        return res.data
    } catch (error) {
        console.log(error);
    }
})

// ham sua 
export const editProject = createAsyncThunk("editProject" , async (p : any) => {
    try {
        const res = await axios.put(`http://localhost:8080/project/${p.id}`,p);
        return res.data ;
    } catch (error) {
        console.log(error);
    }
})

// ham xoa
export const deleteProject = createAsyncThunk("deleteProject" , async (id : number) => {
    try {
        const res = await axios.delete(`http://localhost:8080/project/${id}`);
        return id;
    } catch (error) {
        console.log(error);
    }
})

const managementSlice = createSlice({
    name:"management",
    initialState:{
        project: []
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(getAllData.fulfilled,(state,action) => {
             state.project = action.payload
        })
        .addCase(addProject.fulfilled,(state : any ,action) => {
            state.project.push(action.payload);
        })
        .addCase(editProject.fulfilled,(state : any ,action)=>{
            const index = state.project.findIndex((i:any) => i.id === action.payload.id);
            state.project[index] = action.payload
        })
        .addCase(deleteProject.fulfilled, (state,action) => {
            state.project = state.project.filter((i:any) => i.id !== action.payload);
        })
        
    }
})

export default managementSlice.reducer