import React from 'react'
import Moment from 'react-moment'

import './Document.css'

const DocumentFormDetail = ({document, files, confirmResponse}) => {
  return (
    <div className="section_container document">
        <div className="document_heading">
            <h2>{document.pobl_documentname}</h2>
            <p className="badge">{document.pobl_documentcategory}</p>
        </div>
        <div className="document_detail">
            <div className="form_group">
                <label>Ref</label>
                <p>{document.pobl_documentref}</p>
            </div>
            <div className="form_group">
                <label>Sign By</label>
                <p><Moment date={document.pobl_documentsignby} format="dddd, MMMM Do YYYY" /></p>
            </div>
            <div className="form_group">
                <label>Expires</label>
                <p><Moment date={document.pobl_documentexpires} format="dddd, MMMM Do YYYY" /></p>
            </div>
            <div className="form_group">
                <label>Intro</label>
                <p>{document.pobl_documentintro}</p>
            </div>
        </div>
        <div className="document_files">
            <h3>Files</h3>
            <p>Please read the following files.</p>
            <ul className="list_group">
            {files.length > 0 ? files.map((f, i) => (
                <li key={i} className="list_group_item">
                    <a href={f.url} target='_blank' rel='noreferrer'>{f.name}</a>
                </li>
            )) 
            : <li className="list_group_item">No Documents Found</li>}
            </ul>
        </div>
        <div className="document_confirmation">
            <h3>Confirmation</h3>
            <p>Please confirm that you have read all the attached documents above</p>
            <button className="btn btn-primary" onClick={confirmResponse}>Confirm & Sign</button>
        </div>
    </div>
  )
}

export default DocumentFormDetail