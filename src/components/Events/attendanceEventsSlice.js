// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { query, collection, getDocs, where, serverTimestamp } from "firebase/firestore"
// import { auth, db } from "../../app/FirebaseConfig"
// import { useAuthState } from "react-firebase-hooks/auth";

// //Helper functions for upcoming feature, not yet mature

// export const fetchAcceptedEvents = createAsyncThunk(
//     'fetchAcceptedEvents',
//     async () => {
//         try {
//             const [user] = useAuthState(auth);
//             const q = query(collection(db, "events"), 
//             where("accepted", "array-contains", user.uid));
//             const doc = await getDocs(q);
//             const events = [];
//             for (let i=0; i< doc.docs.length; i++){
//                 const data = doc.docs[i].data();
//                 events.push(data);
//             }
//             return events 
//         } catch (err) {
//             console.log(err)
//         }
//     }
// )
// // export const fetchPastEvents = createAsyncThunk(
// //     'fetchPastEvents',
// //     async () => {
// //         try {
// //             const [user] = useAuthState(auth);
// //             const q = query(collection(db, "events_users"), where("user", "==", user.uid), where("event completed", "==", true))
// //             const doc = await getDocs(q);
// //             const data = doc.docs //doc is an array of docs which have attribute data() that contains our desired data
// //             //to extract individual data, use doc.docs[index].data().desiredItem
// //             return data
// //         } catch (err) {
// //             console.log(err)
// //         }
// //     }
// // )
// // //fix this later
// // export const fetchHostedEvents = createAsyncThunk(
// //     'fetchHostedEvents',
// //     async() => {
// //         try {
// //             const [user] = useAuthState(auth);
// //             const q = query(collection(db, "events_users"), where("user", "==", user.uid), where("event completed", "==", true))
// //             const doc = await getDocs(q);
// //             const data = doc.docs //doc is an array of docs which have attribute data() that contains our desired data
// //             //to extract individual data, use doc.docs[index].data().desiredItem
// //             return data
// //         } catch (err) {
// //             console.log(err)
// //         }
// //     }
// // )
// const eventsSlice = createSlice({
//     name: 'events',
//     initialState: {
//         acceptedEvents: [], //events where join request approved
//         rejectedEvents: [], //events where join request denied
//         hostedEvents: [], //upcoming events you are hosting
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(fetchAcceptedEvents.fulfilled, (state, action) => {
//             state.acceptedEvents = action.payload 
//         });
//         // builder.addCase(fetchPastEvents.fulfilled, (state, action) => {
//         //     state.pastEvents = action.payload
//         // });
//         // builder.addCase(fetchHostedEvents.fulfilled, (state, action) => {
//         //     state.hostedEvents = action.payload
//         // });
//     }
// });
// export const allEvents = (state) => {
//     return state.events;
// };
// export default eventsSlice.reducer;