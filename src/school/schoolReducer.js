import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const addTeachers = createAsyncThunk('teacher/add', async (newTeacher) => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/teachers`, newTeacher)


    return response.data.data
})

export const fetchAllTeachers = createAsyncThunk('teachers/get', async () => {
    try {

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/teachers`)

        return response.data.data
    } catch (err) {
        console.log('Error fetching teachers.', err)
    }


})


export const updateTeacher = createAsyncThunk('teachers/update', async (teacher) => {
    console.log(teacher)
    try {
        const teacherId = teacher.id
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/teachers/${teacherId}`, teacher)

        return response.data.data
    } catch (err) {
        console.log('Error fetching teachers.', err)
    }
})
export const deleteTeacher = createAsyncThunk('teachers/delete', async (teacherId) => {
    try {

        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/teachers/${teacherId}`)

        return response.data.id
    } catch (err) {
        console.log('Error fetching teachers.', err)
    }
})


const schoolReducer = createSlice({
    name: 'school',
    initialState: {
        school: {},
        teachers: [],
        status: 'idle',
        error: null
    },
    reducers: {
        updateSchoolStats: (state, actions) => {
            state.school = actions.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTeachers.pending, (state) => {
            state.status = 'Loading'

        })

        builder.addCase(addTeachers.fulfilled, (state, actions) => {
            state.status = 'Success'
            state.teachers = actions.payload
        })

        builder.addCase(addTeachers.rejected, (state, actions) => {
            state.status = 'Error'
            state.error = actions.payload.message
        })

        builder.addCase(fetchAllTeachers.pending, (state) => {
            state.status = 'Loading'
        })
        builder.addCase(fetchAllTeachers.fulfilled, (state, actions) => {
            state.status = 'Success'
            state.teachers = actions.payload
        })
        builder.addCase(fetchAllTeachers.rejected, (state, actions) => {
            state.status = 'Error'
            state.error = actions.payload.message
        })
        builder.addCase(updateTeacher.pending, (state) => {
            state.status = 'Loading'
        })
        builder.addCase(updateTeacher.fulfilled, (state, actions) => {
            state.status = 'Success'
            const teacherIndex = state.teachers.findIndex(teacher => teacher.id === actions.payload.id)

            state.teachers[teacherIndex] = actions.payload
        })

        builder.addCase(updateTeacher.rejected, (state, actions) => {
            state.status = 'Error'
            state.error = actions.payload.message
        })


        builder.addCase(deleteTeacher.pending, (state) => {
            state.status = 'Loading'
        })

        builder.addCase(deleteTeacher.fulfilled, (state, actions) => {
            state.status = 'Success'


           
            state.teachers = state.teachers.filter(teacher => teacher.id !== actions.payload)
        })

        builder.addCase(deleteTeacher.rejected, (state, actions) => {
            state.status = 'Error'
            state.error = actions.payload.message
        })
    }
})

export const { updateSchoolStats } = schoolReducer.actions
export default schoolReducer