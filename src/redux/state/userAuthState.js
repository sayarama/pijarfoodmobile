import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setUserAuth: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setUserAuth } = userAuthSlice.actions

export default userAuthSlice.reducer