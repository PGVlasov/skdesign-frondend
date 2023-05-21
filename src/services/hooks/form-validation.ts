import { useCallback, useState } from 'react'

export const useFormWithValidation = (): {
  values: any
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleChangeLetters: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleChangeNumbers: (event: React.ChangeEvent<HTMLInputElement>) => void
  errors: string
  isValid: boolean
  resetForm: (newValues?: {}, newErrors?: {},
    newIsValid?: boolean) => void
  setValues: React.Dispatch<any>
} => {
  const [values, setValues] = useState<any>({})
  const [errors, setErrors] = useState<any>({})
  const [isValid, setIsValid] = useState(false)

  const handleChange = (event: any): void => {
    const target = event.target
    const name = target.name
    const value = target.value
    setValues({ ...values, [name]: value })
    setErrors({ ...errors, [name]: target.validationMessage })
    setIsValid(target.closest('form').checkValidity())
  }

  const handleChangeLetters = (event: any): void => {
    const target = event.target
    const name = target.name
    const value = target.value.replace(/[^a-z, а-я]/gi, '')
    setValues({ ...values, [name]: value })
    setErrors({ ...errors, [name]: target.validationMessage })
    setIsValid(target.closest('form').checkValidity())
  }

  const handleChangeNumbers = (event: any): void => {
    const target = event.target
    const name = target.name
    const value = target.value.replace(/[^0-9]/gi, '')
    setValues({ ...values, [name]: value })
    setErrors({ ...errors, [name]: target.validationMessage })
    setIsValid(target.closest('form').checkValidity())
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues)
      setErrors(newErrors)
      setIsValid(newIsValid)
    },
    [setValues, setErrors, setIsValid]
  )

  return { values, handleChange, errors, isValid, resetForm, setValues, handleChangeLetters, handleChangeNumbers }
}
