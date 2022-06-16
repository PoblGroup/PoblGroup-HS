import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import Cases from "../components/Cases/Cases";
import Documents from "../components/Documents/Documents";

import { useEmployeeFetch } from '../context/EmployeeContext';

const Home = () => {
  const { accounts } = useMsal();
  const name = accounts[0] && accounts[0].name
  const email = accounts[0] && accounts[0].username
  const [employee, setEmployee] = useState(null)

  const fetchEmployee = useEmployeeFetch()

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
    <p>test</p>
      <div className="home_page_header">
        <div className="section home_avatar_container">
          <div className="home_avatar_image">
            <img src="https://source.unsplash.com/random/86×86/?portrait" alt="" />
          </div>
          <div className="home_avatar_text">
            <p>Welcome Back</p>
            <h2>{name}</h2>
          </div>
        </div>
      </div>
      
      <div className="home_pagecontent">

        <div className="section home_cases">
          <div className="home_cases_heading">
            <h3>Open Cases</h3>
            <div className="home_cases_create">
              <a href='/cases/new'>+ Add New</a>
            </div>
          </div>
          <div className="section_container">
            <Cases employee={employee}/>
          </div>
        </div>

        <div className="section documents">
          <div className="home_documents_heading">
            <h3>Documents</h3>
          </div>
          <div className="section_container">
            <Documents employee={employee}/>
          </div>
        </div>

      </div>
      
    </>
  )
}

export default Home