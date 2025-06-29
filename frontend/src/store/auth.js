// import { createSlice } from "@reduxjs/toolkit";


// const authSlice = createSlice({

//     name : "auth",
//     initialState : { isLoggedIn : false},

//     reducers : {
//         login(state){
//             state.isLoggedIn = true;
//         },

//         logout(state){
//             state.isLoggedIn = false
//         }
//     }
// });

// export const authActions = authSlice.actions;

// export default authSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.setItem('isLoggedIn', 'false');
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
