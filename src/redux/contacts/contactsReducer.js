import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts } from './contactsOperations';
import { saveContact } from './contactsOperations';
import { deleteContact } from './contactsOperations';

const initialState = {
  items: [],
  filter: '',
  loading: false,
  error: null,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchContacts.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
    [saveContact.fulfilled]: (state, action) => {
      state.items.push(action.payload);
    },
    [deleteContact.fulfilled]: (state, action) => {
      console.log(state);
      console.log(action);
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

export const { updateFilter } = contactsSlice.actions;

export default contactsSlice.reducer;
