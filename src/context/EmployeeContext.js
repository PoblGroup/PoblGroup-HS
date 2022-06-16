import React, { useState, useContext } from 'react'
import { GetDynamicsToken } from '../utils/DynamicsAuth'

const EmployeeContext = React.createContext()
const EmployeeFetchContext = React.createContext()

export function useEmployee() {
    return useContext(EmployeeContext)
}

export function useEmployeeFetch() {
    return useContext(EmployeeFetchContext)
}

export function EmployeeProvider({ children }) {
    // const [employee, setEmployee] = useState(null)
    const [employee, setEmployee] = useState(() => {
        // Get Stored Value
        const e = localStorage.getItem("HS Employee")
        const intialValue = JSON.parse(e)
        return intialValue || null
    })

    async function fetchEmployee(email) {
        const token = await GetDynamicsToken()

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`https://poblgroup-dynamicsapi.azurewebsites.net/api/hs/employees/${email}`, requestOptions)
            const result = await response.json()
            // setEmployee(result)
            localStorage.setItem("HS Employee", JSON.stringify(result));
        } catch (error) {
            console.log('Error', error)
        }
    }

    return (
        <EmployeeContext.Provider value={employee}>
            <EmployeeFetchContext.Provider value={fetchEmployee}>
                {children}
            </EmployeeFetchContext.Provider>
        </EmployeeContext.Provider>
    )
}

