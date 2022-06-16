import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { GetDynamicsToken } from '../../utils/DynamicsAuth'

const Cases = ({employee}) => {
    const page = window.location.pathname

    const [myCases, setMyCases] = useState([])
    const { pobl_employeehsid, pobl_employeeismanager } = employee

    useEffect(() => {
        const FetchCases = async () => {
            let url = ""
            if(page === '/management' && pobl_employeeismanager) {
                url = `https://poblgroup-dynamicsapi.azurewebsites.net/api/hs/events/myteam?managerId=${pobl_employeehsid}`
            } else {
                url = `https://poblgroup-dynamicsapi.azurewebsites.net/api/hs/events?employeeId=${pobl_employeehsid}`
            }

            const token = await GetDynamicsToken()
    
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
    
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
    
            try {
                const response = await fetch(url, requestOptions)
                const result = await response.json()
                console.log('Result', result)

                if(page === '/management' && pobl_employeeismanager) {
                    setMyCases(result)
                } else {
                    result.value.map(c => (
                        c.pobl_eventdateandtime = new Date(c.pobl_eventdateandtime)
                    ))
                    const sortedUserCases = result.value.slice().sort((a, b) => b.pobl_eventdateandtime - a.pobl_eventdateandtime)
                    setMyCases(sortedUserCases)
                }
            } catch (error) {
                console.log('Error', error)
            }
        }
        FetchCases()
    }, [pobl_employeehsid, pobl_employeeismanager, page])

    return (
        <table className="content-table">
            <thead>
                <tr>
                    {page === "/management" ? (
                        <>
                            {/* <td></td> */}
                            <td>Employee Name</td>
                            <td>Case</td>
                            <td>Stage</td>
                            <td>Created</td>
                            <td></td>
                        </>
                    ) : (
                        <>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Stage</th>
                            <th>Created</th>
                            <th></th>
                        </>
                    )}
                    
                </tr>
            </thead>
            <tbody>
                {/* Empty List */}
                {myCases.length === 0 && (
                    <tr>
                        <td colSpan='6'>No Team Cases Found.</td>
                    </tr>
                )}

                {/* Management List */}
                {page === '/management' && myCases.length > 0 && myCases.map((m, index) => (
                    m.events.map((c, i) => (
                        <tr key={i}>
                            {/* <td>
                                <div className="member_avatar_image"><img src="https://source.unsplash.com/random/86×86/?portrait" alt="" /></div>
                            </td> */}
                            <td>{m.employeeName}</td>
                            <td>{c.pobl_casename}</td>
                            <td>{c.pobl_actiontype}</td>
                            <td><Moment date={c.pobl_createdon} format="dddd, MMMM Do YYYY" /></td>
                            <td><Link className="btn" to={`/management/cases/${c.pobl_eventid}`}>View</Link></td>
                        </tr>
                    ))
                ))}

                {/* Peronsal List */}
                {page !== '/management' && myCases.length > 0 && myCases.map((c, index) => (
                    <tr key={index}>
                        <td><Link to={`/cases/${c.pobl_eventid}`}>{c.pobl_casename}</Link></td>
                        <td>{c.pobl_casetype}</td>
                        <td>{c.pobl_actiontype}</td>
                        <td><Moment date={c.pobl_createdon} format="dddd, MMMM Do YYYY" /></td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Cases