import React, { forwardRef, useState, useEffect, useRef } from 'react'

import Input from '../../UI/Input/Input'
import styles from './styles.module.scss'

// available rules for checkbox creation!
const checkboxesForType = {
    number: [
        {
            name: 'e',
            label: 'Equal'
        },
        {
            name: 'gt',
            label: 'Greater Than'
        },
        {
            name: 'lt',
            label: 'Less Than'
        },
        {
            name: 'gte',
            label: 'Greater Than or Equal To'
        },
        {
            name: 'lte',
            label: 'Less Than or Equal To'
        },
    ],
    text: [
        {
            name: 'match',
            label: 'Matches'
        },
        {
            name: 'contain',
            label: 'Contains'
        },
    ]
}

// handles what happens when a checkbox is checked/unchecked. Return either true or false if checkbox should continue with setting its state to checked
const onChangeHandler = (inputName, checked, currentlyChecked, setChecked, alwaysOneChecked) => {

    // if checkbox is checked, set checked to that
    if (checked) {
        setChecked(inputName)

        return true
    } else if (currentlyChecked === inputName && !alwaysOneChecked) { //if checkbox is not checked, and is currently the checked one in state, uncheck it from state ((as long as always one checked is not stated))
        setChecked(null)

        return true
    }

    // change was prevented, do not untick/tick checkbox
    return false
}

/**
 * @param  {} label --> search input label
 * @param  {} type --> search input type (text, number..)
 * @param  {} defaultChecked -> name of checkbox that should be checked by default e.g. 'match'
 * @param  {} ref -> ref that will have .current = { search: '', searchOptions: '' }, where search is the search input HTML element and searchOption is checked checkbox's name
 */
const SearchCriteria = forwardRef(({ label = 'Some Label', type = 'text', defaultChecked = null, alwaysOneChecked = false }, ref) => {
    const searchRef = useRef(null)
    const [checked, setChecked] = useState(defaultChecked)

    // on check of a checkbox, update the ref from parent, so parent can access info about value in search bar and currently checked checkbox
    useEffect(() => {
        ref.current = {
            search: searchRef.current,
            searchOption: checked 
        }
    }, [ref, checked])

    return (
        <div className={styles.searchCriteria}>
            <Input type={type} inputtype="input" label={label} ref={searchRef} />
            <div className={styles.searchOptions}>
                {checkboxesForType[type].map(({ name, label }) => (
                    <Input
                        key={name}
                        inputtype="checkbox"
                        label={label}
                        name={name}
                        checked={checked === name}
                        onChange={({ target }) => onChangeHandler(name, target.checked, checked, setChecked, alwaysOneChecked)}
                    />
                ))}
            </div>
        </div>
    )
})

export default SearchCriteria