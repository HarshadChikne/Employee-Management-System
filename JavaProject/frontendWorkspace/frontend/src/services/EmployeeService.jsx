import axios from 'axios'

const BASE_API='http://localhost:9191/api/employee'

class EmployeeService
{
    addEmployee(employee)
    {
        return axios.post(`${BASE_API}/add`,employee)
    }

    getAllEmployee()
    {
        return axios.get(`${BASE_API}/get`)
    }
    
    getEmployeeById(id)
    {
        return axios.get(`${BASE_API}/get/${id}`)
    }

    editEmployee(id,employee)
    {
        return axios.put(`${BASE_API}/update/${id}`,employee)
    }

    deleteEmployee(id)
    {
        return axios.delete(`${BASE_API}/delete/${id}`)
    }
}
export default new EmployeeService()