import React, { useEffect, useState } from 'react';
import './App.css';
import { studentData } from './studentData'; 

function App() {
   const [data, setData] = useState([]);
   const [Name, setName] = useState('');
   const [DOB, setDOB] = useState('');
   const [Gender, setGender] = useState('');
   const [Std, setStd] = useState('');
   const [Division, setDivision] = useState('');
   const [Rolenumber, setRolenumber] = useState('');
   const [id, setId] = useState(null); // Initialize id as null

   useEffect(() => {
      console.log('Initial Data:', studentData); // Debugging
      setData(studentData);
   }, []);

   const handleEdit = (id) => {
      const dt = data.find(item => item.id === id);
      if (dt) {
         setId(id);
         setName(dt.Name);
         setDOB(dt.DOB);
         setGender(dt.Gender);
         setStd(dt.Std);
         setDivision(dt.Division);
         setRolenumber(dt.Rolenumber);
      }
   };

   const handleDelete = (id) => {
      if (window.confirm("Are you sure to delete this item?")) {
         const updatedData = data.filter(item => item.id !== id);
         setData(updatedData);
      }
   };

   const handleSave = () => {
      if (id !== null) {
         // Update existing item
         const updatedData = data.map(item =>
            item.id === id ? { ...item, Name, DOB, Gender, Std, Division, Rolenumber } : item
         );
         setData(updatedData);
         setId(null); // Reset id after saving
      } else {
         // Add new item
         const newId = data.length ? Math.max(data.map(item => item.id)) + 1 : 1;
         setData([...data, { id: newId, Name, DOB, Gender, Std, Division, Rolenumber }]);
      }
      handleClear(); // Clear the form after save
   };

   const handleClear = () => {
      setId(null);
      setName('');
      setDOB('');
      setGender('');
      setStd('');
      setDivision('');
      setRolenumber('');
   };

   return (
      <div className="App">
         <div>
            <div>
               <label>Name:
                  <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} value={Name} required />
               </label>
            </div>
            <div>
               <label>DOB:
                  <input type='date' placeholder='DOB' onChange={(e) => setDOB(e.target.value)} value={DOB} required />
               </label>
            </div>
            <div>
               <label>Gender:
                  <input type='text' placeholder='Gender' onChange={(e) => setGender(e.target.value)} value={Gender} required />
               </label>
            </div>
            <div>
               <label>Std:
                  <input type='text' placeholder='Std' onChange={(e) => setStd(e.target.value)} value={Std} required/>
               </label>
            </div>
            <div>
               <label>Division:
                  <input type='text' placeholder='Division' onChange={(e) => setDivision(e.target.value)} value={Division} required/>
               </label>
            </div>
            <div>
               <label>Rolenumber:
                  <input type='text' placeholder='Rolenumber' onChange={(e) => setRolenumber(e.target.value)} value={Rolenumber} required />
               </label>
            </div>
         </div>
         <div>
            <button className='btn btn-primary' onClick={handleSave}>Save</button>&nbsp;
            <button className='btn btn-danger' onClick={handleClear}>Clear</button>
         </div>

         <table className='table table-hover'>
            <thead>
               <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>DOB</th>
                  <th>Gender</th>
                  <th>Std</th>
                  <th>Division</th>
                  <th>Rolenumber</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {data.map((item,id) => (
                  <tr key={id}>
                     <td>{id + 1}</td>
                     <td>{item.Name}</td>
                     <td>{item.DOB}</td>
                     <td>{item.Gender}</td>
                     <td>{item.Std}</td>
                     <td>{item.Division}</td>
                     <td>{item.Rolenumber}</td>
                     <td>
                        <button className='btn btn-primary' onClick={() => handleEdit(id)}>Edit</button>&nbsp;
                        <button className='btn btn-danger' onClick={() => handleDelete(id)}>Delete</button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}

export default App;
