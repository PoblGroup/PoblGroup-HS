import { useEffect } from "react";
import Cases from "../components/Cases/Cases";

import { useEmployee, useEmployeeFetch } from '../context/EmployeeContext';

const Home = () => {
  const fetchEmployee = useEmployeeFetch()
  const employee = useEmployee().employee.value[0]
  const { pobl_employeename, pobl_employeeemail } = employee

  useEffect(() => {
    fetchEmployee(pobl_employeeemail)
  }, [fetchEmployee, pobl_employeeemail])

  return (
    <>
      <div className="home_page_header">
        <div className="section home_avatar_container">
          <div className="home_avatar_image">
            <img src="https://source.unsplash.com/random/86×86/?portrait" alt="" />
          </div>
          <div className="home_avatar_text">
            <p>Welcome Back</p>
            <h2>{pobl_employeename}</h2>
          </div>
        </div>
      </div>
      {/* Page Content */}
      <div className="home_pagecontent">
        {/* Open Cases */}
        <div className="section home_cases">
          <div className="home_cases_heading">
            <h3>Open Cases</h3>
            <div className="home_cases_create">
              <a href='/'>+ Add New</a>
            </div>
          </div>
          <div className="section_container">
            <Cases employee={employee}/>
          </div>
        </div>
        {/* Documents */}
        <div className="section documents">
          <div className="home_documents_heading">
            <h3>Documents</h3>
          </div>
          <div className="section_container">
            Content here.....
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Home