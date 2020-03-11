import React, { forwardRef, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.scss'

const setCheckedHandler = (checkbox, onChange, setChecked, isChecked) => {
    if (checkbox && checkbox.current) {
        // assume checkbox will change its check state, set it here so onChange func's checkbox.current has access to current state of checkbox, before applying changes to its state
        // basically gives onChange func access to what the next checked state will be, before choosing if to proceed with it or not
        checkbox.current.checked = !isChecked
    }

    // if set, run the onChange function which should return true if check state should be changed!
    // or  if there is no particular behavior on change of checkbox, just change the state of checked (animates check)
    if ((typeof onChange === 'function' && onChange({ target: checkbox.current })) || typeof onChange !== 'function') {
        
        setChecked(!isChecked)
    } else if (checkbox && checkbox.current) {
        // if parent has said that checkbox should not check/uncheck (based on return value of onChange), then reverse the checked value of html element

        checkbox.current.checked = isChecked
    }
}

const Checkbox = forwardRef(({ name, onChange = null, checked = false }, ref) => {
    const checkbox = useRef(null)
    const [isChecked, setChecked] = useState(checked)

    const classes = [
        styles.checkboxEl,
        isChecked ? styles.checked : ''
    ].join(' ').trim()

    // if a parent controls the checked state, update local state when passed checked prop changes
    useEffect(() => {
        setChecked(checked)
    }, [checked, onChange])

    // if a parent wants a ref to the input checkbox element
    useEffect(() => {
        // make sure ref is indeed passed down meaning we want parent to have it access to it
        if (ref) {
            ref.current = checkbox.current
        }
    }, [checkbox, ref])

    useEffect(() => {

        // if checkbox element's checked state does not match the state's checked state, then update it and trigger on Change.
        if (checkbox.current.checked !== isChecked) {
            checkbox.current.checked = isChecked
        }
    }, [isChecked])

    return (
        <div className={classes} onClick={() => setCheckedHandler(checkbox, onChange, setChecked, isChecked)}>
            <div />
            <input type='checkbox' ref={checkbox} name={name} />
        </div>
    )
})

Checkbox.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    checked: PropTypes.bool
}

export default Checkbox