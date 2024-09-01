import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../type';
type OptionState = (keyof User)[];
const initialState: OptionState = ['name', 'username', 'email', 'phone'];
const optionsSlice = createSlice({
    name: 'option',
    initialState,
    reducers: {
        addOption: (state, action: PayloadAction<keyof User>) => {
            const newOption = action.payload;
            if (!state.includes(newOption)) {
                state.push(newOption);
            }
        },
        removeOption: (state, action: PayloadAction<keyof User>) => {
            return state.filter(option => option !== action.payload);
        }
    }
});
export const { addOption, removeOption } = optionsSlice.actions;
export default optionsSlice.reducer;
