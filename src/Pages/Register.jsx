import { useState, useEffect } from "react"
import { FormRow, Logo } from "../Components"
import Wrapper from '../assets/wrappers/RegisterPage'
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, registerUser } from "../features/user/userSlice"
import { useNavigate } from "react-router-dom"
const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}
const Register = () => {
  const [values, setValues] = useState(initialState);
  const { user, isLoading } = useSelector((store) => store.userState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
    
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if ((!isMember && !name) || !password || !email) {
      toast.error('please fill out all the details'); 
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }
    dispatch(registerUser({name, email, password}))

  }
  const toggleMember = (e) => {
    setValues({...values, isMember:!values.isMember})
  }
  useEffect(() => {
    if (user) {
      navigate('/dashboard');  
    } 
  },[user])
  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {/* NAME FIELD */}
        {!values.isMember && (
          <FormRow
            name="name"
            type="text"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* EMAIL FIELD */}
        <FormRow
          name="email"
          type="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* PASSWORD FIELD */}
        <FormRow
          name="password"
          type="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading?'Loading...':'submit'}
        </button>
        <p>
          {values.isMember ? "Not yet a member?" : "Already a member?"}{" "}
          <button type="button" className="member-btn" onClick={toggleMember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}
export default Register