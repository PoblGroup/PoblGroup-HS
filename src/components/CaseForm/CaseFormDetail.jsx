import React from 'react'
import Moment from 'react-moment'

import './CaseForm.css'

const CaseFormDetail = ({caseDetail}) => {
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
                    <label>Description</label>
                    <p>{caseDetail.description}</p>
                </div>
                <div className="form_group">
                    <label>Impacts External People</label>
                    <p>{(caseDetail.impactsexternalpeople) ? "Yes" : "No"}</p>
                </div>
                <div className="form_group">
                    <label>Impacts Colleagues</label>
                    <p>{(caseDetail.impactscolleagues) ? "Yes" : "No"}</p>
                </div>
            </div>
            {/* Manager Investigation */}
            <h3>Manager Investigation</h3>
            {(caseDetail.actionType === 771570001) || (caseDetail.investigationOutcome === "Resolved") ? (
            <div className="case_detail">
                <div className="form_group">
                    <label>Investigation Date</label>
                    <p>{caseDetail.investigationDate}</p>
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
                    <p>{(caseDetail.employeeTimeOff === null) ? "-" : caseDetail.employeeTimeOff}</p>
                </div>
                <div className="form_group">
                    <label>Risk Assessment Followed?</label>
                    <p>{(caseDetail.riskAssessentFollowed === null) ? "-" : caseDetail.riskAssessentFollowed}</p>
                </div>
                <div className="form_group">
                    <label>Investigation Outcome</label>
                    <p>{caseDetail.investigationOutcome}</p>
                </div>
                <div className="form_group">
                    <label>Investigation Findings</label>
                    <p>{caseDetail.investigationFindings}</p>
                </div>
            </div> ) 
            :
            ( <p>Awaiting Managers Investigation</p> )}
        </div>
    )
}

export default CaseFormDetail