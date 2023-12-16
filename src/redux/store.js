import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './state/counterState'
import userAuthReducer from './state/userAuthState'
import userProfileReducer from './state/userProfileState'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userAuth: userAuthReducer,
    userProfile: userProfileReducer
  },
})