import React, { useState } from 'react'

import './AutoComplete.css'

function AutoComplete({suggestions, label, formik, name}) {
    const [activeSuggestion, setActiveSuggestion] = useState(0)
    const [filteredSuggestions, setFilteredSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [userInput, setUserInput] = useState("")

    const handleOnChange = (e) => {
        const searchText = e.target.value 
        const filtered = suggestions.filter(s => s.key.toLowerCase().indexOf(searchText.toLowerCase()) > -1);

        setFilteredSuggestions(filtered)
        setActiveSuggestion(0)
        setShowSuggestions(true)
        setUserInput(e.target.value)
    }

    const handleOnClick = e => {
        setActiveSuggestion(0)
        setFilteredSuggestions([])
        setShowSuggestions(false)
        setUserInput(e.target.innerText)

        const selectedVal = suggestions.filter(x => x.key === e.target.innerText)
        formik.setFieldValue(name, selectedVal[0].value)
    };

    const onKeyDown = e => {    
        if (e.keyCode === 13) {
            setActiveSuggestion(0)
            setShowSuggestions(false)
            setUserInput(filteredSuggestions[activeSuggestion].key)
        } else if (e.keyCode === 38) {
          if (activeSuggestion === 0) {
            return;
          }
          setActiveSuggestion(activeSuggestion - 1)
        }
        // User pressed the down arrow, increment the index
        else if (e.keyCode === 40) {
          if (activeSuggestion - 1 === filteredSuggestions.length) {
            return;
          }
          setActiveSuggestion(activeSuggestion + 1)
        }
    };

    return (
        <>
            <label>{label}</label>
            <input
                name={name}
                type="text"
                onChange={handleOnChange}
                onKeyDown={onKeyDown}
                value={userInput}
                className="form_control"
                autoComplete='off'
            />
            {formik.touched[name] && formik.errors[name] ? <p>{formik.errors[name]}</p> : null}

            {showSuggestions && userInput && (
                <ul className="suggestions">
                    {filteredSuggestions.map((suggestion, index) => {
                        let className;

                        if(index === activeSuggestion) {
                            className = "suggestion-active"
                        }

                        return (
                            <li className={className} key={suggestion.value} onClick={handleOnClick}>{suggestion.key}</li>
                        )
                    })}
                </ul>
            )}
        </>
        
    )
}

export default AutoComplete