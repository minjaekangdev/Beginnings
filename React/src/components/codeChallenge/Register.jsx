import React, {useState} from 'react'; 
import { Link } from 'react-router-dom';
import usersService from '../../services/usersService'
import { toast } from "react-toastify";

function Register() {
    const [formData, setFormData] = useState({
        firstName: '', 
        lastName: '', 
        email: '', 
        password: '', 
        passwordConfirm: '', 
        avatarUrl: '', 
        tenantId: 'U03N9SMR39B',
    })

    const onFormFieldChange = (e) => {
       // console.log('onFormField Change', e)

        const target = e.target; 
        const name = e.target.name; 
        const value = target.value; 

        const updatedFormData = { ...formData };
        updatedFormData[name] = value; 
        
        setFormData(() => {
            //console.log(updatedFormData)
            return updatedFormData; 
        })
    }

    const onRegisterClick = event => {
        event.preventDefault();
        console.log(formData)
        var checkedBox = event.target.form[6].checked

        if (checkedBox) {
            var onRegisterSuccess = (response) => {
                toast.success(response);
            }
            var onRegisterError = (error) => {
                toast.error('ERROR', error)
            }
            usersService.register(formData).then(onRegisterSuccess).catch(onRegisterError);
        }
        else {
            toast.warning('You must agree to our terms and services!')
        }
    }

    return (
        <React.Fragment>
            <section className='vh-100 bg-image'>
                <div className='mask d-flex align-items-center h-100 gradient-custom-3'>
                    <div className='container h-100'>
                        <div className='row d-flex justify-content-center align-items-center h-100'>
                            <div className='col-12 col-md-9 col-lg-7 col-xl-6'>
                                <div className='card' style={{ 'borderRadius': '15px', 'marginTop' : '3%'}}>
                                    <div className='card-body p-5'>
                                    <h2 className='text-uppercase text-center mb-5'>Register a new membership</h2>
                                    <form>
                                            <div className='form-outline mb-4'>
                                            <label htmlFor="firstName" className='form-label'>First Name</label>
                                                <input onChange={onFormFieldChange} placeholder='Bob' value={formData.firstName} type="text" id='firstName' className='form-control form-control-lg' name='firstName' />
                                                
                                            </div>
                                            <div className='form-outline mb-4'>
                                            <label htmlFor="lastName" className='form-label'>Last Name</label>
                                                <input onChange={onFormFieldChange} placeholder='Bobberson' value={formData.lastName} type="text" id='lastName' className='form-control form-control-lg' name='lastName' />
                                                
                                            </div>
                                            <div className='form-outline mb-4'>
                                            <label htmlFor="emailInput" className='form-label'>Email</label>
                                                <input onChange={onFormFieldChange} placeholder='bobbobberson@email.com' value={formData.email} type="text" id='emailInput' className='form-control form-control-lg' name='email'/>
                                                
                                            </div>
                                            <div className='form-outline mb-4'>
                                            <label htmlFor="passwordInput" className='form-label'>Password</label>
                                                <input onChange={onFormFieldChange} value={formData.password} type="password" id='passwordInput' className='form-control form-control-lg' name='password' />
                                                
                                            </div>
                                            <div className='form-outline mb-4'>
                                            <label htmlFor="passwordConfirm" className='form-label'>Retype your password</label>
                                                <input onChange={onFormFieldChange} value={formData.passwordConfirm} type="password" id='passwordConfirm' className='form-control form-control-lg' name='passwordConfirm' />
                                                
                                            </div>
                                            <div className='form-outline mb-4'>
                                            <label htmlFor="avatarUrl" className='form-label'>Avatar Url</label>
                                                <input onChange={onFormFieldChange} placeholder='https://....' value={formData.avatarUrl} type="text" id='avatarUrl' className='form-control form-control-lg' name='avatarUrl' />
                            
                                            </div>
                                            <div className='form-check d-flex justify-cotent-center mb-5'>
                                            <input type="checkbox" id='confirmCheck' name='confirmCheck' value='' className='form-check-input me-2' />
                                            <label htmlFor="confirmCheck" className='form-check-label'>I agree to all statements in <Link to='/termsofservice'>Terms of Service</Link></label>                                         
                                            </div>

                                            <div className='d-flex justify-content-center'>
                                                <button onClick={onRegisterClick}type='submit' id='submitButton' className='btn btn-primary'>Register</button>
                                            </div>
                                            <p className='text-center text-muted mt-5 mb-0'>Already have an account? <Link to='/login' className='fw-bold text-body'>Login here</Link></p>
                                    </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Register; 