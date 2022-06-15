import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import MemberCaseFormDetail from '../components/CaseForm/MemberCaseFormDetail'
import { GetDynamicsToken } from '../utils/DynamicsAuth'

const MemberCaseDetail = () => {
    const id = useParams().id
    const [caseDetail, setCaseDetail] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        // Get Case Detail
        async function GetCaseDetail(id) {
            const token = await GetDynamicsToken()

            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };     

            try {
                const response = await fetch(`http://localhost:5000/api/hs/events/${id}`, requestOptions)
                const result = await response.json()
                setCaseDetail(result)
                console.log(result)
            } catch (error) {
                console.log('error', error)
            }
        }
        GetCaseDetail(id)
    }, [id])

    return (
        <>
            <button className='btn' onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center' }}>← Back</button>
            {caseDetail && (
                <MemberCaseFormDetail caseDetail={caseDetail} />
            )}
        </>
    )
}

export default MemberCaseDetail