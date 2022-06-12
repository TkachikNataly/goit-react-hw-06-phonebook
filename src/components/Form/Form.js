import React, { useState } from 'react';
import s from './Form.module.css';
import PropTypes from 'prop-types';

export default function Form({ onFormSubmit }) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const reset = () => {
        setName('');
        setNumber('');
    };
    const handleSubmit = e => {
        e.preventDefault();

        onFormSubmit({ name, number });
        reset();
    };
    const handleChangeName = e => {
        setName(e.target.value);
    };

    const handleChangeNumber = e => {
        setNumber(e.target.value);
    };
    return (
        <div>
            <form className={s.form} onSubmit={handleSubmit}>
                <p className={s.title}>Name</p>
                <input
                    className={s.input}
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    value={name}
                    onChange={handleChangeName}
                />
                <p className={s.title}>Number</p>
                <input
                    className={s.input}
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    value={number}
                    onChange={handleChangeNumber}
                />
                <button className={s.button} type="submit">Add Contact</button>
            </form>
        </div>
    );
}
Form.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
};