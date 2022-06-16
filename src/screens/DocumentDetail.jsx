import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DocumentFormDetail from '../components/Documents/DocumentFormDetail'

import { GetDynamicsToken } from '../utils/DynamicsAuth'

const DocumentDetail = () => {
    const id = useParams().id
    const [document, setDocument] = useState(null)
    const [files, setFiles] = useState(null)
    const [documentError, setDocumentError] = useState(null)
    // const [expired, setExpired] = useState(false)
    const [isloading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    // const [confirmed, setConfirmed] = useState({ status: false, message: ""})

    const navigate = useNavigate();

    useEffect(() => {
        async function FetchPolicyResponse() {
            const token = await GetDynamicsToken()

            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            try {
                const response = await fetch(`https://poblgroup-dynamicsapi.azurewebsites.net/api/hs/policyresponses/${id}`, requestOptions)
                const result = await response.json()
                const { error, data } = result
                setIsLoading(false)
                if(error) setDocumentError(error)
                if(data) { 
                    setDocument(data.document)
                    setFiles(data.files)
                    console.log(data)
                    // checkExpiryDate(data)
                }
            } catch (error) {
                console.log('Error', error)
            }
        }
        FetchPolicyResponse()
    }, [id])

    const confirmResponse = async (e) => {
        e.preventDefault()
        const token = await GetDynamicsToken()

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`https://poblgroup-dynamicsapi.azurewebsites.net/api/hs/policyresponses/${id}`, requestOptions)
            const result = await response.json()
            const { error, message } = result
            if(message) navigate(-1)
            if(error) setIsError(true)
        } catch (error) {
            console.log('Error', error)
        }
    }

    return (
        <>
            {isloading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <button className='btn' onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center' }}>← Back</button>
                    {(documentError || isError) ? (
                        (documentError && <p>Error: {documentError}</p>)
                        (isError && <p>Error: {isError}</p>)
                    ) : 
                    (
                        <DocumentFormDetail document={document} files={files} confirmResponse={confirmResponse}/>
                    )}
                </>
            )}
        </>
    )
}

export default DocumentDetail