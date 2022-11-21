// For handling input states
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import * as yup from 'yup'

// For display toasts
import 'react-toastify/dist/ReactToastify.min.css'
import styles from '../styles/Home.module.css'

type FormValues = {
  words: string
  transwords: string
  editedperson: string
}

const schema = yup.object({
  words: yup.string().required('入力必須項目です。'),
  transwords: yup.string().required('入力必須項目です。'),
  editedperson: yup.string().required('入力必須項目です。'),
})

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const resetTextValue = () => {
    reset()
  }

  // Form submit addform
  const submitForm: SubmitHandler<FormValues> = async (data: any) => {
    try {
      await axios.post(`/api/submit-form`, data).then((res) => {
        if (res.status === 201) {
          toast.success('Success', { autoClose: 5000 })
        } else {
          toast.error('Error', { autoClose: 5000 })
        }
      })
    } catch (error) {
      console.log(error)
      toast.error('Error', { autoClose: 5000 })
    }
    reset()
  }

  return (
    <div className={styles.container}>
      <ToastContainer />
      <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
        <h1 className={styles.title}>Everyone's Words</h1>
        <div>
          <label htmlFor='words'>Words</label>
          <input
            type='text'
            id='words'
            placeholder='Words'
            {...register('words', {
              required: true,
            })}
          />
          {errors.words && <p>{errors.words?.message}</p>}
        </div>
        <div>
          <div>
            <label htmlFor='Transwords'>Trans Words</label>
            <input
              type='text'
              id='transwords'
              placeholder='言葉'
              {...register('transwords', {
                required: true,
              })}
            />
            {errors.transwords && <p>{errors.transwords?.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor='editedperson'>Edited Person</label>
          <input
            type='text'
            id='editedperson'
            placeholder='John Cooper'
            {...register('editedperson', {
              required: true,
            })}
          />
          {errors.editedperson && <p>{errors.editedperson?.message}</p>}
        </div>
        <button className={styles.btn} type='submit'>
          Submit
        </button>
        {isSubmitting && <span>Submitting...</span>}
      </form>
    </div>
  )
}
