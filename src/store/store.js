import { configureStore } from '@reduxjs/toolkit'
import rootSlice from './rootSlice'


export default configureStore({
    reducer : {
        root : rootSlice
    }
})