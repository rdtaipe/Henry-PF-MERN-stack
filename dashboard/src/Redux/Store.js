
import { configureStore, createSlice, getDefaultMiddleware } from '@reduxjs/toolkit'
import { Reducers, InitialState } from './Actions.js'

const Slice = createSlice({
    name: 'state',
    initialState: { ...InitialState, },
    reducers: { ...Reducers }
})

export const Store = configureStore({
    reducer: Slice.reducer,
    middleware: getDefaultMiddleware({
        //middleware config
        serializableCheck: false
    })
})

export const actions = Slice.actions
