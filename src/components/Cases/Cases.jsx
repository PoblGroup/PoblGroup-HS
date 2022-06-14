import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetDynamicsToken } from '../../utils/DynamicsAuth'

const Cases = ({employee}) => {
    const [myCases, setMyCases] = useState([])
    const { pobl_employeehsid } = employee

    useEffect(() => {
        const FetchCases = async () => {
            const token = await GetDynamicsToken()
    
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
    
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
    
            try {
                const response = await fetch(`http://localhost:5000/api/hs/events?employeeId=${pobl_employeehsid}`, requestOptions)
                const result = await response.json()
                result.value.map(c => (
                    c.pobl_eventdateandtime = new Date(c.pobl_eventdateandtime)
                ))
                const sortedUserCases = result.value.slice().sort((a, b) => b.pobl_eventdateandtime - a.pobl_eventdateandtime)
                setMyCases(sortedUserCases)
                console.log(sortedUserCases)
            } catch (error) {
                console.log('Error', error)
            }
        }
        FetchCases()
    }, [pobl_employeehsid])

    return (
        <table className="content-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Stage</th>
                    <th>Created</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {myCases.map((c,index) => (
                    <tr key={index}>
                        <td><Link to={`/cases/${c.pobl_eventid}`}>{c.pobl_casename}</Link></td>
                        <td>{c.pobl_casetype}</td>
                        <td>{c.pobl_actiontype}</td>
                        <td>{c.createdon}</td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Cases