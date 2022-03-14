import axios from 'axios';

axios.defaults.baseURL = 'https://622dcced8d943bae34872cd6.mockapi.io';

export const fetchContacts = async () => {
  const { data } = await axios.get('/contacts');
  return data;
};

export const saveContact = async contact => {
  const { data } = await axios.post('/contacts', contact);
  return data;
};

export const deleteContact = async contactId => {
  const {
    data: { id },
  } = await axios.delete(`/contacts/${contactId}`);
  return id;
};
