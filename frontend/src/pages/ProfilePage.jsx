import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import AlertContext from '../context/alert/AlertContext'

import { useUpdateMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

import { FaEye, FaEyeSlash } from 'react-icons/fa6'

import MainContainer from '../components/layout/MainContainer'

import FormWidget from '../components/shared/FormWidget'
import FormHeader from '../components/shared/FormHeader'
import FormControl from '../components/shared/FormControl'
import NameInput from '../components/shared/inputs/NameInput'
import EmailInput from '../components/shared/inputs/EmailInput'
import PasswordInput from '../components/shared/inputs/PasswordInput'
import FormButton from '../components/shared/FormButton'
import Spinner from '../components/shared/Spinner'

function ProfilePage () {
  const { userInfo } = useSelector((state) => state.auth)
  const { setAlertActive } = useContext(AlertContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const {name, email, password, confirmPassword} = formData
  const [showPassword, setShowPassword] = useState({
    showEnterPassword: false,
    showConfirmPassword: false
  })
  const [update, {isLoading}] = useUpdateMutation()
  const [btnClick, setBtnClick] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    setFormData({
      ...formData,
      name: userInfo.name,
      email: userInfo.email
    })
  }, [userInfo.setName, userInfo.setEmail])
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
        const res = await update({
          _id: userInfo._id,
          name,
          email,
          password
        }).unwrap()
        dispatch(setCredentials({...res}))
        setAlertActive('Profile updated!', 'success')
      } catch (error) {
        setAlertActive(error.data.message, 'error')
      }
    }
  }
  return (
    <MainContainer page='profile-page' wrapper={true}>
      <FormWidget onSubmit={onSubmit}>
        <FormHeader>
          <span className="form-heading">Hello, {userInfo.name}!</span>
          <span className="form-subheading">Update your details below...</span>
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
          <div className='icon-input'>
            <PasswordInput type={showPassword.showEnterPassword ? 'text' : 'password'} confirm={false} value={password} onChange={onChange} />
            <button type="button" className='input-btn' onClick={() => setShowPassword({...showPassword, showEnterPassword: !showPassword.showEnterPassword})}>
              {
                showPassword.showEnterPassword ? <FaEyeSlash /> : <FaEye />
              }
            </button>
          </div>
        </FormControl>
        <FormControl>
          <label>Confirm Password</label>
          <div className='icon-input'>
            <PasswordInput type={showPassword.showConfirmPassword ? 'text' : 'password'} confirm={true} value={confirmPassword} onChange={onChange} />
            <button type="button" className='input-btn' onClick={() => setShowPassword({...showPassword, showConfirmPassword: !showPassword.showConfirmPassword})}>
              {
                showPassword.showConfirmPassword ? <FaEyeSlash /> : <FaEye />
              }
            </button>
          </div>
        </FormControl>
        {
          !isLoading ? <FormButton btnClick={btnClick} setBtnClick={setBtnClick}>Update</FormButton>
          : <Spinner />
        }
      </FormWidget>
    </MainContainer>
  )
}

export default ProfilePage