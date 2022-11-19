// For handling input states
import React, { useState } from 'react'

// For display toasts  
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import styles from '../styles/Home.module.css'

export default function Home() {

  // Input states
  const [words, setWords] = useState('');
  const [transwords, setTranswords] = useState('');
  const [editedperson, setEditedperson] = useState('');

  // Form submit handler
  const submitForm = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const res = await fetch('/api/submit-form', {
      method: 'POST',
      body: JSON.stringify({ words, transwords, editedperson }),
    });
    // Success if status code is 201
    if (res.status === 201) {
      toast('Thank you for contacting us!', { type: 'success' });
    } else {
      toast('Please re-check your inputs.', { type: 'error' });
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <form className={styles.form} onSubmit={submitForm}>
        <h1 className={styles.title}>Everyone's Words</h1>
        <div>
          <label htmlFor="words">Words</label>
          <input
            type="text"
            id="words"
            name="words"
            placeholder="Words"
            value={words}
            onChange={(e) => setWords(e.target.value)}
            required
          />
        </div>
        <div>
          <div>
            <label htmlFor="Transwords">Trans Words</label>
            <input
              type="text"
              name="transwords"
              placeholder="言葉"
              value={transwords}
              onChange={(e) => setTranswords(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="editedperson">Edited Person</label>
          <input
            type="text"
            name="editedperson"
            placeholder="Jon Cooper"
            value={editedperson}
            onChange={(e) => setEditedperson(e.target.value)}
            required
          />
        </div>
        <button className={styles.btn} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
