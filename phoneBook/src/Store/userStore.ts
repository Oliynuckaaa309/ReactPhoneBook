import { configureStore } from '@reduxjs/toolkit';
import usersDownload from './userDownload';
import optionsSlice from './options';
export const store = configureStore({
    reducer: {
        users: usersDownload,
        options: optionsSlice,
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
