import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    list: [],
    submitList: [],
    listSuccess: [],
    total: 0,
};

const seatSlice = createSlice({
    name: "seat",
    initialState,
    reducers: {
        handleList: (state, action) => {
            const index = state.list.findIndex((seat) => seat.tenGhe === action.payload.tenGhe)
            if (index === -1) {
                const newList = [...state.list, { ...action.payload }];
                const newList2 = [];
                newList.map((seat) => newList2.push({ maGhe: seat.maGhe, giaVe: seat.giaVe }))

                return { ...state, list: newList, submitList: newList2 };
            } else {
                const newList = state.list.filter(
                    (seat) => seat.tenGhe !== action.payload.tenGhe
                );
                const newList2 = state.submitList.filter(
                    (seat) => seat.maGhe !== action.payload.maGhe
                )
                return { ...state, list: newList, submitList: newList2 };
            }
        },
        handleBooking: (state, action) => {
            const totalPrice = state.list.reduce((total, seat) => {
                return Math.round(total + seat.giaVe);
              }, 0);
            const newList = {...action.payload,  danhSachVe:state.list, }
            return { ...state, listSuccess: newList ,total:totalPrice}
        },
        handleBookAnother: (state, action) => {
            return {list:[],listSuccess:[],submitList:[]}
        },
        clear:(state,action) => {
            return {list:[],listSuccess:[],submitList:[],total:0}
        }
    },
});

// export actions
export const { handleList, handleBooking, handleBookAnother,clear } = seatSlice.actions;

// export default reducer
export default seatSlice.reducer;
