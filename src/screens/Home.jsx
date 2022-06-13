import { useMsal } from "@azure/msal-react";

const Home = () => {
  const { accounts } = useMsal();
  const name = accounts[0] && accounts[0].name

  return (
    <>
      {/* Logged In User */}
      <div className="section home_avatar_container">
        <div className="home_avatar_image">
          <img src="https://source.unsplash.com/random/52×52/?portrait" alt="" />
        </div>
        <div className="home_avatar_text">
          <p>Welcome Back</p>
          <h2>{name}</h2>
        </div>
      </div>
      {/* Page Content */}
      <div className="home_pagecontent">
        {/* Open Cases */}
        <div className="section home_cases">
          <div className="home_cases_heading">
            <h3>Open Cases</h3>
            <div className="home_cases_container">
              Content here.....
            </div>
          </div>
        </div>
        {/* Documents */}
        <div className="section documents">
          <div className="home_documents_heading">
            <h3>Documents</h3>
            <div className="home_documents_container">
              Content here.....
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Home