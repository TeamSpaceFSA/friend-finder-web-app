//Store configuration 
import { configureStore } from '@reduxjs/toolkit'

//Add reducer slices here
//import somethingSlice from '../features/somethingSlice' <- example

const store = configureStore({
    reducer: {
        //somethings: somethingSlice, <- example
    },
})

export default store
