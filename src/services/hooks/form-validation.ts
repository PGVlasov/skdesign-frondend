import { useCallback, useState } from 'react'


export const useFormWithValidation = (): {
    values: any
    handleChange: (event: any) => void
    errors: any
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

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues)
            setErrors(newErrors)
            setIsValid(newIsValid)
        },
        [setValues, setErrors, setIsValid]
    )

    return { values, handleChange, errors, isValid, resetForm, setValues }
}
