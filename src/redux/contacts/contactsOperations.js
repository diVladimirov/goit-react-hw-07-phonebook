import { createAsyncThunk } from '@reduxjs/toolkit';
import * as contactsApi from '../../services/contactsApi';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContactsStatus',
  async (_, { rejectWithValue }) => {
    try {
      const contacts = await contactsApi.fetchContacts();
      return contacts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveContact = createAsyncThunk(
  'contacts/saveContactStatus',
  async (contact, { rejectWithValue }) => {
    try {
      const addContact = await contactsApi.saveContact(contact);
      return addContact;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContactStatus',
  async (contactId, { rejectWithValue }) => {
    try {
      const id = await contactsApi.deleteContact(contactId);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
