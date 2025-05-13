import React, {useState } from 'react'
import { useForm } from 'react-hook-form'
import '../Styles/SignUp.css';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

function SignUp() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()


  const onSubmit = (data) => {

    function createUser() {
      fetch("https://674707a138c8741641d51ba7.mockapi.io/user", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then((res) => {
          console.log("Response Status:", res.status);
          return res.json();
        })
        .then((data) => {
          console.log("createdUser", data);
          const updatedUsers = [...users, data]
          setUsers(updatedUsers)
          Swal.fire({
            toast: true,
            position: 'top',
            icon: 'success',
            title: 'Signed in successfully',
            showConfirmButton: false,
            // timer: 1000,
          });
          navigate('/login');
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
    createUser();

    console.log('Submitted data:', data);
    //   const updatedUsers = [...users, data];
    //   setUsers(updatedUsers);
    //   localStorage.setItem('user', JSON.stringify(updatedUsers));
    //   // alert('Signup successful');
    //   Swal.fire({
    //     toast: true,
    //     position: 'top',
    //     icon: 'success',
    //     title: 'Signed in successfully',
    //     showConfirmButton: false,
    //     timer: 3000,
    //   });
    // navigate('/login');
  };

  const password = watch("password");
  return (
    <div className='signUpContainer'>
      <h2>SignUp</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='subContainer'>
          <label>First Name:</label>
          <input type='text'
            {...register('firstName',
              {
                required: {
                  value: true,
                  message: "First Name is required"
                }
              }
            )} />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>
        <div className='subContainer'>
          <label>Last Name:</label>
          <input type='text'
            {...register('lastName',
              {
                required: {
                  value: true,
                  message: "Last Name is required"
                }
              }
            )} />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>
        <div className='subContainer'>
          <label>Email:</label>
          <input type='text'
            {...register('email',
              {
                required: {
                  value: true,
                  message: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email address"
                  }
                }
              }
            )} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className='subContainer'>
          <label>Age:</label>
          <input type='number'
            {...register('age',
              {
                required: {
                  value: true,
                  message: "Age is required"
                },
                min: {
                  value: 1,
                  message: "Age must be atleast 1"
                }
              }
            )} />
          {errors.age && <p>{errors.age.message}</p>}
        </div>
        <div className='subContainer'>
          <label>Gender:</label>
          <select
            {...register('gender',
              {
                required: {
                  value: true,
                  message: "Gender is required"
                }
              }
            )}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p>{errors.gender.message}</p>}
        </div>
        <div className='subContainer'>
          <label>phone Number:</label>
          <input type='tel'
            {...register('phone',
              {
                required: {
                  value: true,
                  message: "Phone number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Phone number must be 10 digits"
                  }
                }
              }
            )} />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>
        <div className='subContainer'>
          <label>Country:</label>
          <input type='text'
            {...register('country',
              {
                required: {
                  value: true,
                  message: "Country is required"
                }
              }
            )}
          />
          {errors.country && <p>{errors.country.message}</p>}
        </div>
        <div className='subContainer'>
          <label>State:</label>
          <input type='text'
            {...register('state',
              {
                required: {
                  value: true,
                  message: "State is required"
                }
              }
            )}
          />
          {errors.state && <p>{errors.state.message}</p>}
        </div>
        <div className='subContainer'>
          <label>Password:</label>
          <input type='password'
            {...register('password',
              {
                required: {
                  value: true,
                  message: "Password is required",
                  minLength: {
                    value: 6,
                    message: "password must be atleast 6 characters"
                  }
                }
              }
            )}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className='subContainer'>
          <label>Confirm Password:</label>
          <input type='password'
            {...register('confirmpassword',
              {
                required: {
                  value: true,
                  message: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Password do not match"


                }
              }
            )}
          />
          {errors.confirmpassword && <p>{errors.confirmpassword.message}</p>}
        </div>
        <div className='subContainer'>
          <div className='checkBoxContainer'>
            <div className='termsInputContainer'>
              <input type='checkbox'
                {...register('terms',
                  {
                    required: {
                      value: true,
                      message: "You must agree to the terms"
                    }
                  }
                )}
              />
            </div>
            <div className='termsLabelContainer'>
              <label> I agree to the terms and conditions</label>
            </div>
          </div>

          {errors.terms && <p>{errors.terms.message}</p>}
        </div>
        <button type='submit'>Submit</button>
      </form>
      <p className='loginParagraph'>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>

  )
}

export default SignUp