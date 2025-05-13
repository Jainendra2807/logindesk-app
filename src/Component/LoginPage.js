import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../Styles/LoginPage.css';
import Swal from 'sweetalert2';
function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()


  const onSubmit=(data)=>{
    fetch('https://674707a138c8741641d51ba7.mockapi.io/user')
    .then((response)=>(response.json()))
    .then((users)=>{
      const foundUser=users.find(
        (user)=>user.email===data.email && user.password===data.password
      )
      if(foundUser)
      {
        Swal.fire({
          title: `Welcome Back, ${foundUser.firstName}`,
          text: 'You have successfully logged in. Redirecting to your dashboard...',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000,
          position: 'center',
        });
        setTimeout(() => {
          navigate('/dashboard', { state: { email: foundUser.email } });
        }, 1000);
      }
      else {
        Swal.fire({
          title: 'Oops!',
          text: 'Invalid email or password. Please try again.',
          icon: 'error',
          confirmButtonText: 'Retry',
          confirmButtonColor: '#d33',
          position: 'center',
        });
      }
    })
    .catch((error) => {
      console.error('Error fetching users:', error);
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33',
        position: 'center',
      });
    });
  }

  // const onSubmit = (data) => {
  //   const storedUsers = JSON.parse(localStorage.getItem('user')) || [];
  //   const foundUser = storedUsers.find(
  //     (user) => user.email === data.email && user.password === data.password
  //   );

  //   if (foundUser) {
  //     Swal.fire({
  //       title: `Welcome Back, ${foundUser.firstName}`,
  //       text: 'You have successfully logged in. Redirecting to your dashboard...',
  //       icon: 'success',
  //       showConfirmButton: false,
  //       timer: 2000,
  //       toast: false,
  //       position: 'center',
  //     });
  //     localStorage.setItem('loggedInUser', JSON.stringify(foundUser.email));
  //     setTimeout(() => navigate('/dashboard'), 2000);
  //   } else {
  //     Swal.fire({
  //       title: 'Oops!',
  //       text: 'Invalid email or password. Please try again.',
  //       icon: 'error',
  //       confirmButtonText: 'Retry',
  //       confirmButtonColor: '#d33',
  //       position: 'center',
  //     });
  //   }
  // };
  return (
    <div className='loginContainer'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='loginSubContainer'>
          <label>Email:</label>
          <input type='text'
            {...register('email',
              {
                required: {
                  value: true,
                  message: "Email is required"
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address"
                }
              }
            )}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className='loginSubContainer'>
          <label>Password:</label>
          <input type='text'
            {...register('password',
              {
                required: {
                  value: true,
                  message: "Password is required"
                },
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              }
            )}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className='loginSubContainer'>
          <div className='logincheckBoxContainer'>
            <div className='logintermsInputContainer'>
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
            <div className='logintermsLabelContainer'>
              <label> I agree to the terms and conditions</label>
            </div>
          </div>

          {errors.terms && <p>{errors.terms.message}</p>}
        </div>
        <button type='submit'>Login</button>
      </form>
      <p className='signUpParagraph'>
        Don't have an account? <a href="/">Signup</a>
      </p>
    </div>
  )
}

export default LoginPage