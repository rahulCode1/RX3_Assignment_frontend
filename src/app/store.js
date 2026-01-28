import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../students/studentReducer";
import schoolReducer from '../school/schoolReducer'

const store = configureStore({
    reducer: {
        students: studentReducer.reducer,
        school: schoolReducer.reducer
    }
});
export default store;
