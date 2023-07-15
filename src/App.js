
import React, { useEffect, useState } from 'react';

const API_BASE_URL = 'http://localhost:5000'; 

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    title: '',
    department: 'HR',
    annualSalary: '',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/employees`);
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const employeesData = await response.json();
      setEmployees(employeesData);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
     
        await handleUpdate(formData._id);
        
      } else {
     
        const response = await fetch(`${API_BASE_URL}/api/employees`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error('Failed to create employee');
        }
      }
      fetchEmployees();
      setFormData({ _id: '', name: '', title: '', department: 'HR', annualSalary: '' });
    } catch (error) {
      console.error('Error creating/updating employee:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/employees/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update employee');
      }
      fetchEmployees();
      setFormData({ _id: '', name: '', title: '', department: 'HR', annualSalary: '' });
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleEdit = (employee) => {
    setFormData({
      _id: employee._id,
      name: employee.name,
      title: employee.title,
      department: employee.department,
      annualSalary: employee.annualSalary,
    });
  };

  return (
    <div>
      <h1>Employee Management</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required /><br />
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required /><br />
        <label>Department:</label>
        <select name="department" value={formData.department} onChange={handleChange}>
          <option value="HR">HR</option>
          <option value="Tech">Tech</option>
          <option value="Product">Product</option>
          <option value="Leadership">Leadership</option>
        </select><br />
        <label>Annual Salary:</label>
        <input type="number" name="annualSalary" value={formData.annualSalary} onChange={handleChange} required /><br />
        <button type="submit">{formData._id ? 'Update Employee' : 'Create Employee'}</button>
      </form>
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            <strong>Name:</strong> {employee.name}<br />
            <strong>Title:</strong> {employee.title}<br />
            <strong>Department:</strong> {employee.department}<br />
            <strong>Annual Salary:</strong> {employee.annualSalary}<br />
            <button onClick={() => handleDelete(employee._id)}>Delete</button>
            <button onClick={() => handleEdit(employee)}>Edit</button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
