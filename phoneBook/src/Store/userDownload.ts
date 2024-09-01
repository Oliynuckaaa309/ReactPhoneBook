import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, UserState } from '../type';

const initialState: UserState = {
    users: [],
    filteredUsers: [],
    loading: false,
    error: null,
    selectedOption: 'name',
};
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data as User[];;
});
const usersDownload = createSlice({
    name: 'users',
    initialState,
    reducers: {
        filterUsers: (state, action: PayloadAction<{ searchTerm: string; column: keyof User }>) => {
            const { searchTerm, column } = action.payload;
            state.filteredUsers = state.users.filter(user => {
                const value = user[column];
                return typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase());
            });
        },
        setSelectedOption: (state, action: PayloadAction<keyof User>) => {
            state.selectedOption = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                state.filteredUsers = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    }
});
export const { filterUsers, setSelectedOption } = usersDownload.actions;
export default usersDownload.reducer;
