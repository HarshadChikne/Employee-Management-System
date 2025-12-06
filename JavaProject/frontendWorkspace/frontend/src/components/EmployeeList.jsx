import React from 'react'
import {useTypewriter,Cursor} from 'react-simple-typewriter'
import { useState,useEffect, } from 'react'
import { Link } from 'react-router-dom';
import '../App.css'
import EmployeeService from '../services/EmployeeService';
import { toast } from 'react-toastify';


function EmployeeList() {

  const [employees,setEmployees]=useState([]);
  const[searchTerm,setSearchTerm]=useState("")

  useEffect(()=>{
    EmployeeService.getAllEmployee().then(res=>{
      setEmployees(res.data)}).catch(error=>console.log(error))
  },[])

  const filteredEmployees=employees.filter(emp=>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())||
    emp.dept.deptName.toLowerCase().includes(searchTerm.toLowerCase())||
    emp.dept.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [value]=useTypewriter({
    words:["Details","Information","List"],
    loop:true,
    typeSpeed:80,
    deleteSpeed:120
  })

  const deleteEmployee = (id) => {
  const isConfirm = window.confirm("Are you sure you want to delete this employee?");
  if (isConfirm) {
    EmployeeService.deleteEmployee(id)
      .then(() => {
        toast.success("Employee terminated Successfully");

        EmployeeService.getAllEmployee()
          .then((res) => setEmployees(res.data))
          .catch(() => toast.error("Failed to refresh employee list"));
      })
      .catch(() => toast.error("Termination failed"));
  }
};

  return (
  <div className='mt-5'>
      <h3 className='mt-5 text-center pt-3 bi bi-person-lines-fill'>
        &nbsp; &nbsp;Employee {value}<Cursor/>
      </h3> 

      <div className='container mt-5'>

        {/* Row with Add button + search bar side by side */}
        <div className='d-flex justify-content-between mb-3'>
          <Link to="/add-emp" className='btn btn-secondary w-25'>
            ADD EMPLOYEE
          </Link>

          <input
            type="text"
            className="form-control w-50"
            placeholder="Search by name, department, or designation"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table below */}
        <table className='table table-bordered table-striped'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>DOJ</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.doj}</td>
                <td>{emp.dept.deptName}</td>
                <td>{emp.dept.designation}</td>
                <td>
                  <Link to={`/edit-emp/${emp.id}`} className='btn btn-warning'>Edit</Link>
                  <button className='btn btn-danger ms-3' onClick={() => deleteEmployee(emp.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
  </div>
);
}
export default EmployeeList