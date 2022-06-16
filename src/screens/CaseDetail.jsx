import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CaseFormDetail from '../components/CaseForm/CaseFormDetail'
import { GetDynamicsToken } from '../utils/DynamicsAuth'

const CaseDetail = () => {
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
                const response = await fetch(`https://poblgroup-dynamicsapi.azurewebsites.net/api/hs/events/${id}`, requestOptions)
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
                <CaseFormDetail caseDetail={caseDetail} />
            )}
        </>
    )
}

export default CaseDetail