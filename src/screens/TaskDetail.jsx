import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TaskFormDetail from '../components/Tasks/TaskFormDetail'

import { GetDynamicsToken } from '../utils/DynamicsAuth'

const TaskDetail = () => {
    const id = useParams().id
    const [task, setTask] = useState(null)
    const [files, setFiles] = useState(null)
    const [taskError, setTaskError] = useState(null)
    // const [expired, setExpired] = useState(false)
    const [isloading, setIsLoading] = useState(true)
    // const [confirmed, setConfirmed] = useState({ status: false, message: ""})

    const navigate = useNavigate();

    useEffect(() => {
        async function FetchTasks() {
            const token = await GetDynamicsToken()

            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            try {
                const response = await fetch(`http://localhost:5000/api/hs/diary/entries/${id}`, requestOptions)
                const result = await response.json()
                const { error, data } = result
                if(error) setTaskError(error)
                if(data) {
                    setTask(data)
                    setFiles(data.files)
                    console.log(data)
                }
                setIsLoading(false)
            } catch (error) {
                console.log('Error', error)
            }
        }
        FetchTasks()
    }, [id])

    return (
        <>
            {isloading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <button className='btn' onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center' }}>← Back</button>
                    {(taskError) ? (
                        (taskError && <p>Error: {taskError}</p>)
                    ) : 
                    (
                        <TaskFormDetail task={task} files={files} />
                    )}
                </>
            )}
        </>
    )
}

export default TaskDetail