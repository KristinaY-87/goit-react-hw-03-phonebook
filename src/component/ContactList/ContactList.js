import React from 'react';
import styles from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContacts }) => (
  <>
    <h2 className={styles.title}>Contacts</h2>
    <ul className={styles.list}>
      {contacts.map(({ id, name, number }) => (
        <li className={styles.item} key={id}>
          <span className={styles.text}>
            {name}: {number}
          </span>

          <button
            className={styles.btn}
            type="button"
            onClick={() => onDeleteContacts(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </>
);

export default ContactList;
