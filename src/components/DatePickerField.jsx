import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const DatePickerField = ({label, name, value, onChange, eventCreated}) => {
  return (
      <>
        <label>{label}</label>
        <DatePicker 
            className='form_control'
            dateFormat="dd/MM/yyyy HH:mm"
            selected={( (value && new Date(value)) || null )}
            onChange={val => onChange(name, val)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            disabled={eventCreated ? true : false}
            
        />
    </>
  )
}

export default DatePickerField