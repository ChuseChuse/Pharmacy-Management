import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UpdateMedicine = (props) => { // Include props parameter
  

  const [drugData, setDrugData] = useState({
    DrugID: '',
    UnitPrice: '',
    ExpireDate: new Date()
  });

  const handleDateChange = (date) => {
    setDrugData(prevData => ({
      ...prevData,
      ExpireDate: date
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDrugData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.put(`http://localhost:8000/api/drugs/${props.DrugID}`, {
      UnitPrice: drugData.UnitPrice,
      ExpireDate: drugData.ExpireDate
    });
    alert('Medicine updated successfully!');
  } catch (error) {
    console.error('Error updating medicine:', error.response); // Log error response
    alert('Failed to update medicine. Please try again.');
  }
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/drugs/${props.DrugID}`);
        const { DrugName, UnitPrice, ExpireDate } = response.data;
       
        setDrugData(prevData => ({
          ...prevData,
          DrugName,
          UnitPrice,
          ExpireDate: new Date(ExpireDate)
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [props.DrugID]);
  
  

  return (
    <form 
    
    style={{ width: '400px', margin: '0 auto', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }} onSubmit={handleSubmit} >
      <h3><b>Drug Inventory</b></h3>
    <label>Update Medicine PRICE Named:{props.DrugName}</label>
      <label style={{ display: 'block', marginBottom: '10px', fontSize: '16px', fontWeight: 'bold' }}>
        Unit Price:
        <input
          style={{
            width: 'calc(100% - 20px)',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px'
          }}
          type="text"
          name="UnitPrice"
          value={drugData.UnitPrice}
          onChange={handleInputChange}
        />
      </label>
      <label style={{ display: 'block', marginBottom: '10px', fontSize: '16px', fontWeight: 'bold' }}>
        Expire Date:
        <DatePicker
          selected={drugData.ExpireDate}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy"
          style={{
            width: 'calc(100% - 20px)',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
      </label>
      <button
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
        type="submit"
      >
        Update MedicinePrice
      </button>
    </form>
  );
};

export default UpdateMedicine;

