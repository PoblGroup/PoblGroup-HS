import React, { useState } from 'react'
import Moment from 'react-moment'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { GetDynamicsToken } from '../../utils/DynamicsAuth'

const TaskFormDetail = ({task, files}) => {
    const id = useParams().id
    const [areasCovered, setAreasCovered] = useState("");
    const [areasRemaining, setAreasRemaining] = useState("");
    const [completionNotes, setCompletionNotes] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

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

    const notifyError = (message) => { toast.error(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }

    const UpdateEntry = async (entry, completion) => {
        var data = null
        const token = await GetDynamicsToken()
    
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");
    
        if(completion) {
            data = JSON.stringify({
                "completionNotes": entry.completionNotes,
                "completion": "true"
            });
        } else {
            data = JSON.stringify({
                "areasCovered": entry.areasCovered,
                "areasRemaining": entry.areasRemaining,
                "completion": "false"
            });
        }
    
        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
          };
    
        try {
            const response = await fetch(`https://poblgroup-dynamicsapi.azurewebsites.net/api/hs/diary/entries/${entry.id}`, requestOptions)
            const result = await response.json()
            return result
        } catch (error) {
            console.log('Error', error)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(areasCovered === "") {
            notifyError("Please fill in fields")
        } else {
            setIsSubmitting(true)

            const entryUpdate = {
                id,
                areasCovered,
                areasRemaining
            }

            const updatedEntry = await UpdateEntry(entryUpdate, false)
            
            if(updatedEntry.updated) { 
                setIsSubmitting(false)
                notify(updatedEntry.message)    
            }
        }
    }

    const handleCompletion = async (event) => {
        event.preventDefault()
        if(completionNotes === "") notifyError("Please provide completion notes")
        
        setIsSubmitting(true)

        const entryUpdate = {
            id,
            completionNotes
        }

        const updatedEntry = await UpdateEntry(entryUpdate, true)
        
        if(updatedEntry.updated) { 
            setIsSubmitting(false)
            notify(updatedEntry.message)    

            const navigateBack = () => {
                navigate('/management')
            }

            setTimeout(navigateBack, 6000);
        }
    }

    return (
        <div className="section_container document">
            <div className="document_heading">
                <h2>{task.name}</h2>
                <p className="badge">{task.document.pobl_taskcategory}</p>
            </div>
            <div className="document_detail">
                <div className="form_group">
                    <label>Ref</label>
                    <p>{task.document.pobl_taskref}</p>
                </div>
                <div className="form_group">
                    <label>Created</label>
                    <p><Moment date={task.createdOn} format="dddd, MMMM Do YYYY" /></p>
                </div>
                <div className="form_group">
                    <label>Due Date</label>
                    <p><Moment date={task.due} format="dddd, MMMM Do YYYY" /></p>
                </div>
            </div>
            <div className="document_files">
                <h3>Documents</h3>
                <p>Please use the following documents to go over this information with your team.</p>
                <ul className="list_group">
                {files.length > 0 ? files.map((f, i) => (
                    <li key={i} className="list_group_item">
                        <a href={f.url} target='_blank' rel='noreferrer'>{f.name}</a>
                    </li>
                )) 
                : <li className="list_group_item">No Documents Found</li>}
                </ul>
            </div>
            <div className="document_form">
                <form onSubmit={handleSubmit}>  
                    <div className="col-2">
                        <div className="form_group">
                            <label>Diary Areas Covered</label>
                            <textarea 
                                as="textarea" 
                                placeholder="What have you covered?" 
                                className='form_control'
                                rows={5} 
                                value={areasCovered} 
                                onChange={(e) => setAreasCovered(e.target.value)}
                            />
                        </div>
                        <div className="form_group">
                            <label>Diary Left to Do</label>
                            <textarea 
                                as="textarea" 
                                className='form_control'
                                placeholder="What do you have left to cover?" 
                                rows={5} 
                                value={areasRemaining} 
                                onChange={(e) => setAreasRemaining(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <button className='btn' type="submit" disabled={isSubmitting ? true : false}>{(isSubmitting) ? "Updating..." : "Update"}</button>{' '}
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
            </div>
            <div className="document_confirmation" style={{ marginTop: '2rem'}}>
                <h3>Confirmation</h3>
                <p>Please confirm that you have read all the attached documents above</p>
                <form onSubmit={handleCompletion}>  
                    <div className="form_group">
                        <label>Completion Notes</label>
                        <textarea 
                            as="textarea" 
                            placeholder="Please provide some notes" 
                            className='form_control'
                            rows={5} 
                            value={completionNotes} 
                            onChange={(e) => setCompletionNotes(e.target.value)}
                        />
                    </div>
                    <button className='btn btn-yellow' type="submit">Confirm & Complete</button>
                </form>
            </div>
        </div>
    )
}

export default TaskFormDetail