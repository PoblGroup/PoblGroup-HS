import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { GetDynamicsToken } from '../../utils/DynamicsAuth'

const Documents = ({employee}) => {
    const [myDocuments, setMyDocuments] = useState([])
    const [myDocumentsError, setMyDocumentsError] = useState(null)
    const { pobl_employeehsid } = employee

    useEffect(() => {
        const FetchDocuments = async () => {
            const token = await GetDynamicsToken()

            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            try {
                const response = await fetch(`http://localhost:5000/api/hs/policyresponses?employeeId=${pobl_employeehsid}`, requestOptions)
                const result = await response.json()
                const { error, data } = result
                if(error) setMyDocumentsError(error)
                if(data) setMyDocuments(data)
            } catch (error) {
                console.log('Error', error)
            }
        }
        FetchDocuments()
    }, [pobl_employeehsid])

    return (
        <table className="content-table">
            <thead>
                <tr>
                    <th>Policy Document</th>
                    <th>Sign By</th>
                    <th>Created</th>
                    <th>Signed</th>
                </tr>
            </thead>
            <tbody>
                {myDocuments && myDocuments.map((d,index) => (
                    <tr key={index}>
                        <td><Link to={`/documents/${d.id}`}>{d.document.name}</Link></td>
                        <td><Moment date={d.document.signBy} format="dddd, MMMM Do YYYY" /></td>
                        <td><Moment date={d.createdOn} format="dddd, MMMM Do YYYY" /></td>
                        <td>{d.signed}</td>
                    </tr>
                ))}
                {myDocumentsError && (
                    <tr>
                        <td hidden>0</td>
                        <td colSpan={4}>{myDocumentsError}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Documents