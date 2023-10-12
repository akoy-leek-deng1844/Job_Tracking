import { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "../../features/user/userSlice";
import { FormRow } from "../../Components";
const Profile = () => {
  const { user, isLoading } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name:user?.name || '',
    email:user?.email || '',
    lastName:user?.lastName || '',
    location:user?.location || '',
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, lastName, location } = userData;
    if (!name || !email || !lastName || !location) {
      toast.error('please fill out all inputs')
      return;
    }
    dispatch(updateUser({name, email, lastName, location}))
  }
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({...userData, [name]: value})
  }
  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <h3>Profile</h3>
        <div className="form-center" style={{padding:'1rem'}}>
          <FormRow
            type="text"
            handleChange={handleChange}
            name="name"
            value={userData.name}
          />
          <FormRow
            type="email"
            handleChange={handleChange}
            name="email"
            value={userData.email}
          />
          <FormRow
            type="text"
            handleChange={handleChange}
            name="lastName"
            labelText="last name"
            value={userData.lastName}
          />
          <FormRow
            type="text"
            handleChange={handleChange}
            name="location"
            value={userData.location}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Profile;
