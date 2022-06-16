import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

import { useEmployee } from '../../context/EmployeeContext'
import DatePickerField from '../DatePickerField'
import AutoComplete from '../AutoComplete/AutoComplete'
import { GetDynamicsToken } from '../../utils/DynamicsAuth'
import { GetLookupValues } from '../../utils/FormLookups'

const NewCaseForm = ({ type }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [eventCreated, setEventCreated] = useState(false)
    const [locations, setLocations] = useState([])
    const [accidentCategories, setAccidentCategories] = useState([])
    const [injuries, setInjuries] = useState([])
    const [injuryParts, setInjuryParts] = useState([])
    const [employees, setEmployees] = useState([])

    const employeeData = useEmployee()
    const employee = employeeData.employee.value[0]
    const roles = employeeData.employeeRoles

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: "",
            date: new Date(),
            location: "",
            exactLocation: "",
            description: "",
            jobRole: roles[0].id,
            affectedPerson: "",
            affectedPersonNotes: "",
            category: "",
            injury: "",
            injuryPart: ""
        },
        validationSchema: Yup.object({
            title: Yup.string().max(150, "Exceeds 150 Characters").required("Title Required"),
            date: Yup.string().required("Incident Date Required"),
            location: Yup.string().required("Location Required"),
            exactLocation: Yup.string().required("Exact Location Required"),
            description: Yup.string().required("Description Required"),
            jobRole: Yup.string().required("Job Role Required"),
            category: (type === "Accident") ? Yup.string().required("Category Required") : Yup.string(),
            injury: (type === "Accident") ? Yup.string().required("Injury Required") : Yup.string()
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true)
            const formData = {
                title: values.title,
                eventDate: values.date.toISOString(),
                locationId: values.location,
                exactLocation: values.exactLocation,
                description: values.description,
                caseType: type,
                jobRole: values.jobRole,
                employeeId: employee.pobl_employeehsid,
            }

            if(type === "Accident") {
                formData.affectedPerson = values.affectedPerson
                formData.affectedPersonNotes = values.affectedPersonNotes
                formData.category = values.category
                formData.injury = values.injury
                formData.injuryPart = values.injuryPart
            }

            console.log('Form Data', formData)

            const created = await CreateNewCase(formData, type)
            if(created.status === 200) {
                setIsSubmitting(false)
                setEventCreated(true)
                notify("Case Reported Successfully!")
                
                const navigateBack = () => {
                    navigate('/')
                }
    
                setTimeout(navigateBack, 6000);
            }
        }
    })

    const CreateNewCase = async (formData, type) => {
        const token = await GetDynamicsToken()

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var data = {
            title: formData.title,
            eventDate: formData.eventDate,
            locationId: formData.locationId,
            exactLocation: formData.exactLocation,
            description: formData.description,
            caseType: formData.caseType,
            jobRoleId: formData.jobRole,
            employeeId: formData.employeeId,
            
        };

        if(type === "Accident") {
            data.affectedPerson = formData.affectedPerson
            data.affectedPersonNotes = formData.affectedPersonNotes
            data.category = formData.category
            data.injury = formData.injury
            data.injuryPart = formData.injuryPart
        }

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
        };

        try {
            const response = await fetch("https://poblgroup-dynamicsapi.azurewebsites.net/api/hs/events", requestOptions)
            const result = await response.json()
            return result
        } catch (error) {
            console.log('Error', error)
        }
    }

    const notify = (message) => { toast.success(message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    useEffect(() => {
        async function FetchTeams() {
            let loc = []
            
            const token = await GetDynamicsToken()

            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            try {
                const response = await fetch(`https://poblgroup-dynamicsapi.azurewebsites.net/api/hs/events/teams`, requestOptions)
                const result = await response.json()
                if(result.value.length > 0) {
                    result.value.map(t => loc.push({ key: t.pobl_teamname, value: t.pobl_teamid}))
                    setLocations(loc)
                }
            } catch (error) {
                console.log('Error', error)
            }
        }
        async function FetchLookups() {
            const lookups = await GetLookupValues()
            if (lookups) {
                setAccidentCategories(lookups.categories)
                setInjuries(lookups.injuries)
                setInjuryParts(lookups.injuryParts)
                setEmployees(lookups.employees)
            }
        }

        FetchTeams()
        FetchLookups()
    }, [])

    return (
        <>
            <h2>New {type} Case</h2>
            <p>Please complete the following form to report your {type.toLowerCase()}</p>

            
            <form onSubmit={formik.handleSubmit} autoComplete='off'>
                <div className="col-2">
                    <div className="form_group">
                        <label>Title</label>
                        <input name="title" type="text" placeholder="Enter a name" className='form_control'
                            value={formik.values.title} 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            readOnly={eventCreated ? true : false}
                        />
                        {formik.touched.title && formik.errors.title ? <p>{formik.errors.title}</p> : null}
                    </div>
                    <div className="form_group">
                        <label>Job Role</label>
                        <select name="jobRole" 
                            value={formik.values.jobRole} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                            disabled={eventCreated ? true : false}
                            className='form_control'
                            style={{ height: '100%'}}
                        >
                            {roles.map(option => {
                                return (
                                    <option key={option.id} value={option.id} label={option.title} />
                                )
                            })}
                        </select>
                        {formik.touched.jobRole && formik.errors.jobRole ? <p>{formik.errors.jobRole}</p> : null}
                    </div>
                </div>
                
                
                <h3>Event Details</h3>
                <div className="col-3">
                    <div className="form_group">
                        <DatePickerField
                            label="Date and Time"
                            name="date"
                            value={formik.values.date}
                            onChange={formik.setFieldValue}
                            eventCreated={eventCreated}
                        />
                        {formik.errors.date ? <p>{formik.errors.date}</p> : null}
                    </div>
                    <div className="form_group">
                        <AutoComplete label={"Location of Incident"} name={"location"} suggestions={locations} formik={formik} />
                    </div>
                    <div className="form_group">
                        <label>Exact Location</label>
                        <input name="exactLocation" type="text" placeholder="Enter an exact location" className='form_control'
                            value={formik.values.exactLocation} 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            readOnly={eventCreated ? true : false}
                        />
                        {formik.touched.exactLocation && formik.errors.exactLocation ? <p>{formik.errors.exactLocation}</p> : null}
                    </div>
                    <div className="form_group">
                        <label>Description</label>
                        <textarea name="description" as="textarea" className='form_control' rows={6} 
                            value={formik.values.description} 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            readOnly={eventCreated ? true : false}
                        />
                        {formik.touched.description && formik.errors.description ? <p>{formik.errors.description}</p> : null}
                    </div>
                </div>
                

                {/* If Accident Type */}
                {(type === "Accident") ? ( 
                    <>
                        <h3>Accident Details</h3>
                        <div className="col-3">
                            <div className="form_group">
                                <label>Accident Category</label>
                                <select name="category" 
                                    className='form_control'
                                    value={formik.values.category} 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur}
                                    disabled={eventCreated ? true : false}
                                >
                                    {accidentCategories.map(option => {
                                        return (
                                            <option key={option.value} value={option.value} label={option.key} />
                                        )
                                    })}
                                </select>
                                {formik.touched.category && formik.errors.category ? <p>{formik.errors.category}</p> : null}
                            </div>
            
                            <div className="form_group">
                                <label>Accident Injury Sustained</label>
                                <select name="injury" 
                                    className='form_control'
                                    value={formik.values.injury} 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur}
                                    disabled={eventCreated ? true : false}
                                >
                                    {injuries.map(option => {
                                        return (
                                            <option key={option.value} value={option.value} label={option.key} />
                                        )
                                    })}
                                </select>
                                {formik.touched.injury && formik.errors.injury ? <p>{formik.errors.injury}</p> : null}
                            </div>
            
                            <div className="form_group">
                                <label>Accident Injured Part</label>
                                <select name="injuryPart" 
                                    className='form_control'
                                    value={formik.values.injuryPart} 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur}
                                    disabled={eventCreated ? true : false}
                                >
                                    {injuryParts.map(option => {
                                        return (
                                            <option key={option.value} value={option.value} label={option.key} />
                                        )
                                    })}
                                </select>
                                {formik.touched.injuryPart && formik.errors.injuryPart ? <p>{formik.errors.injuryPart}</p> : null}
                            </div>

                            <div className="form_group">
                                <AutoComplete label={"Affected Person (Employee)"} name={"affectedPerson"} suggestions={employees} formik={formik} />
                            </div>
            
                            <div className="form_group">
                                <label>Affected Person (Notes)</label>
                                <input name="affectedPersonNotes" as="textarea" className='form_control' rows={4} 
                                    value={formik.values.affectedPersonNotes} 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    readOnly={eventCreated ? true : false}
                                />
                                {formik.touched.affectedPersonNotes && formik.errors.affectedPersonNotes ? <p>{formik.errors.affectedPersonNotes}</p> : null}
                            </div>
                        </div>
                        
                    </> 
                ) : null }

                <button className='btn btn-yellow' type="submit" disabled={isSubmitting || eventCreated ? true : false}>
                    {isSubmitting ? "Saving your request..." : "Submit"}
                </button>

                {/* React Toastify */}
                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </form>
        </>
    )
}

export default NewCaseForm