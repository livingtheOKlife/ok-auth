import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'

import AlertContext from '../context/alert/AlertContext'

import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

import MainContainer from '../components/layout/MainContainer'

import FormWidget from '../components/shared/FormWidget'
import FormHeader from '../components/shared/FormHeader'
import FormControl from '../components/shared/FormControl'
import NameInput from '../components/shared/inputs/NameInput'
import EmailInput from '../components/shared/inputs/EmailInput'
import PasswordInput from '../components/shared/inputs/PasswordInput'
import FormButton from '../components/shared/FormButton'
import Spinner from '../components/shared/Spinner'

function RegisterPage () {
  const { userInfo } = useSelector((state) => state.auth)
  const {setAlertActive} = useContext(AlertContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const { name, email, password, confirmPassword } = formData
  const [showPassword, setShowPassword] = useState({
    showEnterPassword: false,
    showConfirmPassword: false,
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [register, {isLoading}] = useRegisterMutation()
  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setAlertActive('Passwords do not match', 'error')
    } else {
      try {
        const res = await register({ name, email, password }).unwrap()
        dispatch(setCredentials({...res}))
        setAlertActive(`Welcome, ${name}!`, 'success')
        navigate('/')
      } catch (error) {
        setAlertActive(error.data.message, 'error')
      }
    }
  }
  return (
    <MainContainer page='register-page' wrapper={true}>
      <FormWidget onSubmit={onSubmit}>
        <FormHeader>
          <span className="form-heading">Welcome to <span className="logo"><em>OK</em>auth</span>!</span>
          <span className="form-subheading">Enter your details below and we'll take it from there...</span>
        </FormHeader>
        <FormControl>
          <label>Name</label>
          <NameInput value={name} onChange={onChange} />
        </FormControl>
        <FormControl>
          <label>Email</label>
          <EmailInput value={email} onChange={onChange} />
        </FormControl>
        <FormControl>
          <label>Password</label>
          <div className="icon-input">
          <PasswordInput type={showPassword.showEnterPassword ? 'text' : 'password'} confirm={false} value={password} onChange={onChange} />
            <button type="button" className="input-btn" onClick={() => setShowPassword({...showPassword, showEnterPassword: !showPassword.showEnterPassword})}>
              {
                showPassword.showEnterPassword ? <FaEyeSlash /> : <FaEye />
              }
            </button>
          </div>
        </FormControl>
        <FormControl>
          <label>Confirm Password</label>
          <div className="icon-input">
          <PasswordInput type={showPassword.showConfirmPassword ? 'text' : 'password'} confirm={true} value={confirmPassword} onChange={onChange} />
            <button type="button" className="input-btn" onClick={() => setShowPassword({...showPassword, showConfirmPassword: !showPassword.showConfirmPassword})}>
              {
                showPassword.showConfirmPassword ? <FaEyeSlash /> : <FaEye />
              }
            </button>
          </div>
        </FormControl>
        {
          !isLoading ? <FormButton>Sign up</FormButton>
          : <Spinner />
        }
      </FormWidget>
    </MainContainer>
  )
}

export default RegisterPage