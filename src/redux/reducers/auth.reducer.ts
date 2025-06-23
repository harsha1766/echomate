import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserType } from 'utils/types/user.types'

// Define a type for the slice state
interface AuthState {
    value: number
    user: UserType | null
    loading: boolean;
    users: UserType[]
}

// Define the initial state using that type
const initialState: AuthState = {
    value: 0,
    user: null,
    loading: true,
    users: []
}

export const authSlice = createSlice( {
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        stopLoading: ( state ) => {
            state.loading = false
        },
        setUser: ( state, payload ) => {
            state.user = payload.payload
        },
        logout: ( state ) => {
            state.user = null
        },
        increment: ( state ) => {
            state.value += 1
        },
        decrement: ( state ) => {
            state.value -= 1
        },
        setUsers: ( state, action: PayloadAction<UserType[]> ) => {
            state.users = action.payload
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: ( state, action: PayloadAction<number> ) => {
            state.value += action.payload
        },
    },
} )

export const { increment, decrement, incrementByAmount, stopLoading, setUser, setUsers, logout } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = ( state: RootState ) => state.counter.value

export default authSlice.reducer