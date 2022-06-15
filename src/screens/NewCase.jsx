import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import NewCaseForm from '../components/CaseForm/NewCaseForm';

const NewCase = () => {
  const [form, setForm] = useState(null)
  const navigate = useNavigate();

  const caseTypes = [
    { id: 1, name: "Accident", description: "Event which results in injury or ill-health of people or catastrophic / serious property damage"}, 
    { id: 2, name: "Incident", description: "Event that has caused or could have caused damage to any property, or equipment"}, 
    { id: 3, name: "Near Miss", description: "Event that results in no injury or damage but had the potential to do so, or where employees have felt threatened / vulnerable in a certain situation"}, 
  ]

  const handleFormSelect = (e) => {
    e.preventDefault()
    const selectedForm = e.target.value.replace(' ', '');
    setForm(selectedForm)
  }
  
  return (
    <>
      <button className='btn' onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center' }}>← Back</button>
      <div className="section_container">

        {form === null ? (
          <div className="new_case_container">
            <h3>Select A Case Type</h3>
            <div className="new_case">
              {caseTypes.map((t, i) => (
                <div key={i} className="card">
                  <h3>{t.name}</h3>
                  <p>{t.description}</p>
                  <button className='btn btn-yellow' value={t.name} onClick={handleFormSelect}>Select</button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="new_case_form_container">
            <NewCaseForm type={form} />
          </div>
        )}
      </div>
    </>
  )
}

export default NewCase