//Store configuration 
import { configureStore } from '@reduxjs/toolkit'

//Add reducer slices here
//import somethingSlice from '../features/somethingSlice' <- example
import eventsSlice  from '../components/Events/attendanceEventsSlice'

const store = configureStore({
    reducer: {
        //somethings: somethingSlice, <- example
        events: eventsSlice,
    },
})

export default store
