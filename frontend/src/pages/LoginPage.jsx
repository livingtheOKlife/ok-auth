import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'

import AlertContext from '../context/alert/AlertContext'

import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

import MainContainer from '../components/layout/MainContainer'

import FormWidget from '../components/shared/FormWidget'
import FormHeader from '../components/shared/FormHeader'
import FormControl from '../components/shared/FormControl'
import EmailInput from '../components/shared/inputs/EmailInput'
import FormButton from '../components/shared/FormButton'
import PasswordInput from '../components/shared/inputs/PasswordInput'
import Spinner from '../components/shared/Spinner'

function LoginPage () {
  const {userInfo} = useSelector((state) => state.auth)
  const {setAlertActive} = useContext(AlertContext)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const {email, password} = formData
  const [showPassword, setShowPassword] = useState(false)
  const [login, {isLoading}] = useLoginMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
    try {
      const res = await login({...formData}).unwrap()
      dispatch(setCredentials({...res}))
      setAlertActive('Welcome Back!', 'success')
      navigate('/')
    } catch (error) {
      setAlertActive(error.data.message, 'error')
    }
  }
  return (
    <MainContainer page='login-page' wrapper={true}>
      <FormWidget onSubmit={onSubmit}>
        <FormHeader>
          <span className="form-heading">Welcome back to <span className="logo"><em>OK</em>auth</span>!</span>
          <span className="form-subheading">Enter your details below and we'll take it from there...</span>
        </FormHeader>
        <FormControl>
          <label>Email</label>
          <EmailInput value={email} onChange={onChange} />
        </FormControl>
        <FormControl>
          <label>Password</label>
          <div className="icon-input">
            <PasswordInput type={showPassword ? 'text': 'password'} confirm={false} value={password} onChange={onChange} />
            <button type="button" className='input-btn' onClick={() => setShowPassword(!showPassword)}>
              {
                showPassword ? <FaEyeSlash /> : <FaEye />
              }
            </button>
          </div>
        </FormControl>
        {
          !isLoading ? <FormButton>Sign in</FormButton>
          : <Spinner />
        }
        <span className="form-text">Not a member? <Link to='/register'>Sign up quick</Link></span>
      </FormWidget>
    </MainContainer>
  )
}

export default LoginPage