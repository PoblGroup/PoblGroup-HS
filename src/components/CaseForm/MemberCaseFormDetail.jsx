import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import * as Yup from 'yup'
import { GetDynamicsToken } from '../../utils/DynamicsAuth'
import { GetLookupValues } from '../../utils/FormLookups'

import AutoComplete from '../AutoComplete/AutoComplete'
import DatePickerField from '../DatePickerField'

import './CaseForm.css'

const MemberCaseFormDetail = ({caseDetail}) => {
    const id = useParams().id
    const [isSubmitting, setIsSubmitting] = useState(false)
    // const [submitted, setSubmitted] = useState(true)
    // const [showNextActions, setShowNextActions] = useState(false)
    const [employees, setEmployees] = useState([])
    const [witnessTypes, setWitnessTypes] = useState([])
    const [emergencyServices, setEmergencyServices] = useState([])

    const navigate = useNavigate();

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

    const UpdateCaseManagerInvestigation = async (formData) => {
        const token = await GetDynamicsToken()

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var data = JSON.stringify(formData);

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`https://poblgroup-dynamicsapi.azurewebsites.net/api/hs/events/${formData.caseId}`, requestOptions)
            const result = await response.json()
            return result
        } catch (error) {
            console.log('Error', error)
        }
    }

    const formik = useFormik({
        initialValues: {
            eventFindings: "",
            investigationDate: new Date(),
            witnessType: "",
            witness: "",
            emergencyService: "",
            emergencyServiceDetails: "",
            employeeTimeOff: [],
            riskAssessment: []
        },
        validationSchema: Yup.object({
            eventFindings: Yup.string().required("Event Findings Required"),
            investigationDate: Yup.string().required("Investigation Date Required").nullable(),
            witnessType: Yup.string().required("Please provide a witness type")
        }),
        onSubmit: async (values) => {
            const formData = {
                caseId: id,
                eventFindings: values.eventFindings,
                investigationDate: values.investigationDate.toISOString(),
                witnessType: values.witnessType,
                witness: values.witness,
                emergencyService: values.emergencyService,
                emergencyServiceDetails: values.emergencyServiceDetails,
                employeeTimeOff: (values.employeeTimeOff[0] === "on") ? true : false,
                riskAssessment: (values.riskAssessment[0] === "on") ? true : false
            }
            setIsSubmitting(true)

            const updated = await UpdateCaseManagerInvestigation(formData)
            if(updated) {
                setIsSubmitting(false)
                notify("Investigation Details Added!")

                const navigateBack = () => {
                    navigate('/management')
                }
    
                setTimeout(navigateBack, 6000);
            }
        }
    })

    useEffect(() => {
        async function FetchLookups() {
            const lookups = await GetLookupValues()
            if (lookups) {
                setEmployees(lookups.employees)
                setWitnessTypes(lookups.witnessTypes)
                setEmergencyServices(lookups.emergencyServices)
            }
        }
        FetchLookups()
    }, [])


    return (
        <div className="section_container case">
            <div className="case_heading">
                <h2>{caseDetail.name}</h2>
                <p className="text-muted">Incident Date: <Moment date={caseDetail.date} format="dddd, MMMM Do YYYY" /></p>
                <p className="badge">{caseDetail.caseType}</p>
            </div>
            {/* Initial Case Reported */}
            <h3>Case Summary</h3>
            <div className="case_detail">
                <div className="form_group">
                    <label>Case Reference</label>
                    <p>{caseDetail.ref}</p>
                </div>
                <div className="form_group">
                    <label>Case Name</label>
                    <p>{caseDetail.name}</p>
                </div>
                <div className="form_group">
                    <label>Date & Time</label>
                    <p><Moment date={caseDetail.date} format="dddd, MMMM Do YYYY" /></p>
                </div>
                <div className="form_group">
                    <label>Location</label>
                    <p>{caseDetail.exactLocation}</p>
                </div>
                <div className="form_group">
                    <label>Impacts External People</label>
                    <p>{(caseDetail.impactsexternalpeople) ? "Yes" : "No"}</p>
                </div>
                <div className="form_group">
                    <label>Impacts Colleagues</label>
                    <p>{(caseDetail.impactscolleagues) ? "Yes" : "No"}</p>
                </div>
                <div className="form_group">
                    <label>Description</label>
                    <p>{caseDetail.description}</p>
                </div>
            </div>

            {/* Manager Investigation */}
            <h3>Manager Investigation</h3>
            
            {/* Investigation Completed */}
            {(caseDetail.investigationOutcome === "Resolved" && caseDetail.resolutionOutcome === 771570000) || caseDetail.actionType === 771570001 ? (
                <div className="case_detail">
                    <div className="form_group">
                        <label>Investigation Date</label>
                        <p><Moment date={caseDetail.investigationDate} format="dddd, MMMM Do YYYY" /></p>
                    </div>
                    <div className="form_group">
                        <label>Witness Type</label>
                        <p>{(caseDetail.witnessType === null) ? "-" : caseDetail.witnessType}</p>
                    </div>
                    <div className="form_group">
                        <label>Witness</label>
                        <p>{(caseDetail.witness === null) ? "-" : caseDetail.witness}</p>
                    </div>
                    <div className="form_group">
                        <label>Emergency Services</label>
                        <p>{(caseDetail.emergencyService === null) ? "-" : caseDetail.emergencyService}</p>
                    </div>
                    <div className="form_group">
                        <label>Emergency Service Details</label>
                        <p>{(caseDetail.emergencyServiceDetails === null) ? "-" : caseDetail.emergencyServiveDetails}</p>
                    </div>
                    <div className="form_group">
                        <label>Employee Time Off?</label>
                        <p>{(caseDetail.employeeTimeOff === null) ? "-" : (caseDetail.employeeTimeOff === true) ? "Yes" : "No"}</p>
                    </div>
                    <div className="form_group">
                        <label>Risk Assessment Followed?</label>
                        <p>{(caseDetail.riskAssessentFollowed === null) ? "-" : (caseDetail.riskAssessentFollowed === true) ? "Yes" : "No"}</p>
                    </div>
                    <div className="form_group">
                        <label>Investigation Outcome</label>
                        <p>{caseDetail.investigationOutcome}</p>
                    </div>
                    <div className="form_group">
                        <label>Investigation Findings</label>
                        <p>{caseDetail.investigationFindings}</p>
                    </div>
                </div>
            ) : null }

            {/* If Investigation Needed */}
            {(caseDetail.resolutionOutcome === null && caseDetail.actionType !== 771570001) ? (
                <form onSubmit={formik.handleSubmit}>
                    <div className="form_group">
                        <DatePickerField
                            label="Date and Time"
                            name="investigationDate"
                            value={formik.values.investigationDate}
                            onChange={formik.setFieldValue}
                        />
                        {formik.touched.investigationDate && formik.errors.investigationDate ? <p>{formik.errors.investigationDate}</p> : null}
                    </div>

                    <div className="col-2">
                        <div className='form_group'>
                            <label>Were there any witnesses?</label>
                            <select name="witnessType" className='form_control'
                                value={formik.values.witnessType} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}
                            >
                                {witnessTypes.map(option => {
                                    return (
                                        <option key={option.value} value={option.value} label={option.key} />
                                    )
                                })}
                            </select>
                            {formik.touched.witnessType && formik.errors.witnessType ? <p>{formik.errors.witnessType}</p> : null}
                        </div>
                        { (formik.values.witnessType === "771570001") ? (
                            <div className="form_group">
                                <AutoComplete label={"Please select an Employee"} name={"witness"} suggestions={employees} formik={formik} />
                                {formik.touched.witness && formik.errors.witness ? <p>{formik.errors.witness}</p> : null}
                            </div>
                        ) : null }
                        { (formik.values.witnessType === "771570002") ? (
                        <div className="from_group">
                            <label>Please enter a witness name</label>
                            <input name="witness" type="text" 
                                value={formik.values.witness} 
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className='form_control'
                            />
                            {formik.touched.witness && formik.errors.witness ? <p>{formik.errors.witness}</p> : null}
                        </div>
                    ) : null }
                    </div>  

                    <div className="col-2">
                        <div className='form_group'>
                            <label>Were Emergency Services Called?</label>
                            <select name="emergencyService" 
                                value={formik.values.emergencyService} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}
                                className="form_control"
                                placeholder="Select a service if called"
                            >
                                {emergencyServices.map(option => {
                                    return (
                                        <option key={option.value} value={option.value} label={option.key} />
                                    )
                                })}
                                </select>
                            {formik.touched.emergencyService && formik.errors.emergencyService ? <p>{formik.errors.emergencyService}</p> : null}
                        </div>
                        { (formik.values.emergencyService !== "") ? (
                        <div className="form_group">
                            <label>Please provide details around emergency services</label>
                            <textarea name="emergencyServiceDetails"
                                value={formik.values.emergencyServiceDetails} 
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form_control"
                            />
                            {formik.touched.emergencyServiceDetails && formik.errors.emergencyServiceDetails ? <p>{formik.errors.emergencyServiceDetails}</p> : null}
                        </div>
                        ) : null }
                    </div>               
                    
                    <div className="col-3">
                        <div className='form_group'>
                            <label style={{ marginRight: '.75rem'}}>Did the employee have any time off?</label>
                            <input  
                                type="checkbox"
                                id="employeeOff-switch" 
                                inline 
                                name="employeeTimeOff"
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className='form_group'>
                            <label style={{ marginRight: '.75rem'}}>Was the Risk Assessment Followed?</label>
                            <input
                                type='checkbox'
                                id="riskAssessment-switch" 
                                inline 
                                name="riskAssessment"
                                onChange={formik.handleChange}
                            />
                        </div>
                    </div>
                    
                    <div className="form_group">
                        <label>Findings/Notes</label>
                        <textarea name="eventFindings" 
                            value={formik.values.eventFindings} 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form_control"
                        />
                        {formik.touched.eventFindings && formik.errors.eventFindings ? <p>{formik.errors.eventFindings}</p> : null}
                    </div>
                    <button className="btn btn-yellow" type="submit" disabled={isSubmitting ? true : false}>{(isSubmitting) ? "Updating..." : "Update"}</button>{' '}
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
            ) : null}
            

        </div>
    )
}

export default MemberCaseFormDetail