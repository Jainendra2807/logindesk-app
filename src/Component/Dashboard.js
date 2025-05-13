import React, { useState, useEffect } from 'react';
import '../Styles/Dashboard.css';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDetailsList, setFormDetailsList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const location = useLocation();

  const loggedInUserEmail = location.state?.email;

  useEffect(() => {
    fetch('https://674707a138c8741641d51ba7.mockapi.io/user')
      .then((response) => response.json())
      .then((users) => {
        const foundUser = users.find(user => user.email === loggedInUserEmail);
        setCurrentUser(foundUser);
        if (foundUser) {
          const userDetails = users.filter(detail => detail.userId === foundUser.id);
          setFormDetailsList(userDetails);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [loggedInUserEmail]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = (data) => {
    const travelData = {
      ...data,
      userId: currentUser?.id || null,
      email: currentUser?.email || null,
    };

    fetch('https://674707a138c8741641d51ba7.mockapi.io/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(travelData),
    })
      .then((response) => response.json())
      .then((newDetail) => {
        setFormDetailsList((prevDetails) => [...prevDetails, newDetail]);
        closeModal();
      })
      .catch((error) => console.error('Error saving travel details:', error));
  };

  const deleteDetail = (id) => {
    fetch(`https://674707a138c8741641d51ba7.mockapi.io/user/${id}`, { method: 'DELETE' })
      .then(() => {
        setFormDetailsList(prevDetails => prevDetails.filter(detail => detail.id !== id));
      })
      .catch((error) => console.error('Error deleting detail:', error));
  };

  return (
    <div className='dashContainer'>
      <div className='userInfoContainer'>
        {currentUser ? (
          <div>
            <p><strong>First Name:</strong> {currentUser.firstName}</p>
            <p><strong>Phone No:</strong> {currentUser.phone}</p>
          </div>
        ) : (
          <p>No user data available</p>
        )}
        <div className='addButton'>
          <button onClick={openModal}>Add Travel Details</button>
        </div>
      </div>
      <div>
        {isModalOpen && (
          <div className='modal'>
            <div className='modalContent'>
              <h2>Enter Travel Details</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label>From:</label>
                  <input
                    type='text'
                    {...register('from', {
                      required: {
                        value: true,
                        message: "From field is required",
                      },
                    })}
                    placeholder='Enter starting point'
                  />
                  {errors.from && <p className="error">{errors.from.message}</p>}
                </div>
                <div>
                  <label>Destination:</label>
                  <input
                    type='text'
                    {...register('destination', {
                      required: {
                        value: true,
                        message: "Destination is required",
                      },
                    })}
                    placeholder='Enter destination point'
                  />
                  {errors.destination && <p className="error">{errors.destination.message}</p>}
                </div>
                <div>
                  <label>Modes:</label>
                  <select
                    {...register("modes", { required: "Please select a mode of transport" })}
                  >
                    <option value="">--Select Mode--</option>
                    <option value="Bus">Bus</option>
                    <option value="Train">Train</option>
                    <option value="Flight">Flight</option>
                  </select>
                  {errors.modes && <p className="error">{errors.modes.message}</p>}
                </div>
                <button type="submit" className='closeButton'>Submit</button>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className='formDetailsContainer'>
        {formDetailsList.length > 0 ? (
          <div className='travelContainer'>
            <h2>Travel Details</h2>
            {formDetailsList.map((details) => (
              <div key={details.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }} className='travelFieldsContainer'>
                <div className='detailsContainer'>
                  <h3>From</h3>
                  <p>{details.from}</p>
                </div>
                <div className='detailsContainer'>
                  <h3>Destination</h3>
                  <p>{details.destination}</p>
                </div>
                <div>
                  <h3>Modes</h3>
                  <p>{details.modes}</p>
                </div>
                <button onClick={() => deleteDetail(details.id)} className='deleteButton'>Delete</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No travel details added yet.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
