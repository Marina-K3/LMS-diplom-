import React, {useState,useEffect} from 'react';
import './dstyle.css';
import SideBar from './SideBar';
function Dashboard() {
  // const [dashboard , setDashboard] = useState(0);
  
  const [userscount , setUserscount] = useState(0);
  const [coursescount , setCoursescount] = useState(0);
  const[enrolled , setEnrolled] = useState(0);

  useEffect(()=>{
    fetch("http://localhost:8080/api/users").then((data)=>data.json()).then((res)=>setUserscount(res.length));
    fetch("http://localhost:8080/api/courses").then((data)=>data.json()).then((res)=>setCoursescount(res.length));
    fetch("http://localhost:8080/api/learning").then((data)=>data.json()).then((res)=>setEnrolled(res.length));
  },[])

  return (

      <body style={{ backgroundColor: "#eee" }}>
      <SideBar current={"dashboard"} />
      <section id="content">

        <main>
          <div className="head-title">
            <div className="left">
              <h1 id="dashboard" style={{ color: "darkblue" }}>Панель управления</h1>
            </div>
          </div>
          <ul className="box-info">
            <li>
              <i className="bx bxs-group" id="i"></i>
              <span className="text">
            <h3>{userscount}</h3>
            <p>Всего пользователей</p>
          </span>
            </li>
            <li>
              <i className="bx bx-book" id="i"></i>
              <span className="text">
            <h3>{coursescount}</h3>
            <p>Всего курсов</p>
          </span>
            </li>
            <li>
              <i className="bx bxs-calendar-check" id="i"></i>
              <span className="text">
            <h3>{enrolled}</h3>
            <p>Всего записей</p>
          </span>
            </li>
          </ul>
        </main>
      </section>
      </body>


  );
}

export default Dashboard;
