// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { GetEmployee401kBalance } from "../../Scenes/Employees/API/EmployeeBalanceApi";



// //fetch action

// export const fetchEmployeeData = createAsyncThunk(
//     'employee/fetchAll',
//     async()=>{
//         const balance = await GetEmployee401kBalance();
//         // const netWorth = await 
//         const ytdContribution = await GetEmployee401kBalance();
//     }
// );

// //slice
// const employeeSlice = createSlice({
//     name:'employee',
//     initialState:{
//         balance: 0,
//         ytdContribution: 0,
//         loading: false
//     },
//     reducers:{},
//     extraReducers:(builder) =>{
//         builder
//         .addCase(fetchEmployeeData.pending, (state)=>{
//             state.loading = true;
//         })

//         .addCase(fetchEmployeeData.fulfilled, (state, action)=>{
//             state.loading = false;
//             state.balance = action.payload.balance;
//             state.ytdContribution = action.payload.ytd;


//         })

//         .addCase(fetchEmployeeData.rejected, (state,action)=>{

//             state.loading = false;
//             state.error = action.error.message;

//         })
//     }

// });

// export default employeeSlice.reducer;