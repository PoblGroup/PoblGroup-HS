import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import Gravatar from 'react-gravatar'

import Cases from "../components/Cases/Cases";
import Tasks from "../components/Tasks/Tasks";

import { useEmployeeFetch } from '../context/EmployeeContext';

const Management = () => {
  const { accounts } = useMsal();
  const email = accounts[0] && accounts[0].username
  const fetchEmployee = useEmployeeFetch()
  const [employee, setEmployee] = useState(null)

  // const employee = useEmployee().employee.value[0]
  // const { pobl_employeename, pobl_employeeemail } = employee

  useEffect(() => {
    const GetEmployee = async () => {
      await fetchEmployee(email)
      const emp = JSON.parse(localStorage.getItem("HS Employee"))
      setEmployee(emp.employee.value[0])
    }
    GetEmployee()
  }, [fetchEmployee, email])

  return (
    <>
      <div className="home_page_header">
        <div className="section home_avatar_container">
          <div className="home_avatar_image">
            <Gravatar email={employee.pobl_employeeemail} size={100} default="" />
          </div>
          <div className="home_avatar_text">
            <p>Welcome Back</p>
            <h2>{employee.pobl_employeename}</h2>
          </div>
        </div>
        <p style={{ fontSize: '.9rem', color:'lightgrey', marginTop: '-20px', marginBottom: '20px'}}>Image powered by <a href="https://en.gravatar.com/">Gravatar</a></p>
      </div>
      {/* Page Content */}
      <div className="home_pagecontent">
        {/* Open Cases */}
        <div className="section home_cases">
          <div className="home_cases_heading">
            <h3>Team Open Cases</h3>
          </div>
          <div className="section_container">
            <Cases employee={employee}/>
          </div>
        </div>
        {/* Documents */}
        <div className="section documents">
          <div className="home_documents_heading">
            <h3>Manager Tasks</h3>
          </div>
          <div className="section_container">
            <Tasks employee={employee}/>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Management