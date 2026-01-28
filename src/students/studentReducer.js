import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'



export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/students`)

  return response.data.data
})

export const addStudentAsync = createAsyncThunk('students/addStudent', async (newStudent) => {


  const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/students`, newStudent)

  return response.data.data
})

export const updateStudentAsync = createAsyncThunk('students/updateStudent', async (dataToUpdate) => {
  const studentId = dataToUpdate.id
  const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/students/${studentId}`, dataToUpdate)


  return response.data.data
})

export const deleteStudentAsync = createAsyncThunk('students/deleteStudent', async (id) => {
  const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/students/${id}`)

  return response.data.studentId
})

const studentReducer = createSlice({
  name: "students",
  initialState: {
    students: [],
    status: 'idle',
    error: null,
    filter: "All",
    sortBy: "Name",
  },
  reducers: {

    setFilter: (state, action) => {
      state.filter = action.payload

    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.pending, (state) => {
      state.status = 'Loading'
    })
    builder.addCase(fetchStudents.fulfilled, (state, actions) => {
      state.status = 'Success'
      state.students = actions.payload
    })
    builder.addCase(fetchStudents.rejected, (state, actions) => {
      state.status = 'Error'
      state.error = actions.error.message
    })

    builder.addCase(addStudentAsync.pending, (state) => {
      state.status = 'Loading'
    })
    builder.addCase(addStudentAsync.fulfilled, (state, actions) => {

      state.status = 'Success'
      state.students.push(actions.payload)
    })
    builder.addCase(addStudentAsync.rejected, (state, actions) => {
      state.status = 'Error'
      state.error = actions.error.message
    })

    builder.addCase(updateStudentAsync.pending, (state) => {
      state.status = 'Loading'
    })

    builder.addCase(updateStudentAsync.fulfilled, (state, actions) => {

      const studentIndex = state.students.findIndex(student => student.id == actions.payload.id)

      state.status = 'Success'
      state.students[studentIndex] = actions.payload
    })
    builder.addCase(updateStudentAsync.rejected, (state, actions) => {
      state.status = 'Error'
      state.error = actions.error.message
    })
    builder.addCase(deleteStudentAsync.pending, (state) => {
      state.status = 'Loading'
    })
    builder.addCase(deleteStudentAsync.fulfilled, (state, action) => {
      state.status = 'Success'
      state.students = state.students.filter(student => student.id !== action.payload)
    })
    builder.addCase(deleteStudentAsync.rejected, (state, actions) => {
      state.status = 'Error'
      state.error = actions.error.message
    })
  }
});



export const { setFilter, setSortBy } = studentReducer.actions
export default studentReducer
