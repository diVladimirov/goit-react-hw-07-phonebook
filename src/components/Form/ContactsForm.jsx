import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { saveContact } from 'redux/contacts/contactsOperations';
import { nanoid } from 'nanoid';
import { fetchContacts } from 'redux/contacts/contactsOperations';

import {
  FormStyle,
  FormStyleLabel,
  FormStyleInput,
  FormStyleButton,
} from './ContactsForm.styled';

const ContactsForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchContacts()), [dispatch]);

  const items = useSelector(state => state.contacts.items);

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleNumberChange = event => {
    setPhone(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const nameToAdd = items.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (nameToAdd) {
      return alert(`${name} is already in contacts.`);
    }
    dispatch(saveContact({ id: nanoid(4), name, phone }));
    reset();
  };

  const reset = () => {
    setName('');
    setPhone('');
  };

  return (
    <FormStyle onSubmit={handleSubmit}>
      <FormStyleLabel>Name</FormStyleLabel>
      <FormStyleInput
        type="text"
        value={name}
        onChange={handleNameChange}
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        placeholder="Input name"
        required
      />

      <FormStyleLabel>Number</FormStyleLabel>
      <FormStyleInput
        type="tel"
        value={phone}
        onChange={handleNumberChange}
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        placeholder="Input number xxx-xx-xx"
      />
      <FormStyleButton type="submit">Add contact</FormStyleButton>
    </FormStyle>
  );
};

export default ContactsForm;

ContactsForm.propTypes = {
  onFormSubmit: PropTypes.func,
};
