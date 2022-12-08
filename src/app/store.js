//Store configuration 
import { configureStore } from '@reduxjs/toolkit'

//Add reducer slices here
//import somethingSlice from '../features/somethingSlice' <- example
import eventsSlice from '../components/events/eventsSlice'

const store = configureStore({
    reducer: {
        //somethings: somethingSlice, <- example
        events: eventsSlice,

    },
})

export default store;
export * from '../components/events/eventsSlice'
