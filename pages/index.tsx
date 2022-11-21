// For handling input states
import axios from 'axios'
import React, { useEffect, useState } from 'react'

// For display toasts
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import styles from '../styles/Home.module.css'

export default function Home() {
  // Input states
  const [words, setWords] = useState('')
  const [transwords, setTranswords] = useState('')
  const [editedperson, setEditedperson] = useState('')

  const [active, setActive] = useState(false)

  const data = { Words: words, Transwords: transwords, EditedPerson: editedperson }

  // Form submit addform
  const submitForm = async () => {
    if (!active) {
      try {
        axios.post(`/api/submit-form`, data)
        setActive(true)
        toast.success('Success', { autoClose: 5000 })
      } catch (error) {
        console.log(error)
        toast.error('Error', { autoClose: 5000 })
      }
    }
  }

  return (
    <div className={styles.container}>
      <ToastContainer />
      <form className={styles.form} onSubmit={submitForm}>
        <h1 className={styles.title}>Everyone's Words</h1>
        <div>
          <label htmlFor='words'>Words</label>
          <input
            type='text'
            id='words'
            name='words'
            placeholder='Words'
            value={words}
            onChange={(e) => setWords(e.target.value)}
            required
          />
        </div>
        <div>
          <div>
            <label htmlFor='Transwords'>Trans Words</label>
            <input
              type='text'
              name='transwords'
              placeholder='言葉'
              value={transwords}
              onChange={(e) => setTranswords(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor='editedperson'>Edited Person</label>
          <input
            type='text'
            name='editedperson'
            placeholder='John Cooper'
            value={editedperson}
            onChange={(e) => setEditedperson(e.target.value)}
            required
          />
        </div>
        <button className={styles.btn} type='submit'>
          Submit
        </button>
      </form>
    </div>
  )
}
