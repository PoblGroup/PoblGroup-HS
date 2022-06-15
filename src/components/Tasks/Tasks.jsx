import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { GetDynamicsToken } from '../../utils/DynamicsAuth'

const Tasks = ({employee}) => {
    const [myTasks, setMyTasks] = useState([])
    const [tasksError, setTasksError] = useState(null)
    const { pobl_employeehsid } = employee

    useEffect(() => {
        const FetchTasks = async () => {
            const token = await GetDynamicsToken()

            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            try {
                const response = await fetch(`http://localhost:5000/api/hs/diary/entries?employeeId=${pobl_employeehsid}`, requestOptions)
                const result = await response.json()
                const { error, data } = result
                if(error) setTasksError(error)
                if(data) setMyTasks(data)
            } catch (error) {
                console.log('Error', error)
            }
        }
        FetchTasks()
    }, [pobl_employeehsid])

    return (
        <table className="content-table">
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Due</th>
                    <th>Custom Task</th>
                    <th>Signed?</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {myTasks && myTasks.map((t,index) => (
                    <tr key={index}>
                        <td>{t.taskName}</td>
                        <td><Moment date={t.due} format="dddd, MMMM Do YYYY" /></td>
                        <td>{t.custom}</td>
                        <td>{t.signed}</td>
                        <td><Link to={`tasks/${t.id}`}><button className='btn'>View</button></Link></td>
                    </tr>
                ))}
                {tasksError && (
                    <tr>
                        <td colSpan={4}>{tasksError}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Tasks