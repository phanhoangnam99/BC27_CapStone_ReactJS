import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authAPI from 'apis/authAPI'

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isLoading: false,
  error: null
}

export const login = createAsyncThunk(
  'authentication/auth/login',
  async (values, { rejectWithValue }) => {
    try {
      const data = await authAPI.login(values)
      // Lưu thông tin vào localStorate
      localStorage.setItem('user', JSON.stringify(data))

      let previousData = localStorage.getItem('user')
      previousData = previousData ? JSON.parse(previousData) : {}

      const newData = { ...previousData, ...values }
      console.log(newData)

      localStorage.setItem('user', JSON.stringify(newData))
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user')
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.user = payload
    })
  }
})

export const { logout } = authSlice.actions

export default authSlice.reducer
