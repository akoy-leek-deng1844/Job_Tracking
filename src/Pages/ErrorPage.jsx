import img from '../assets/images/not-found.svg';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ErrorPage';
const ErrorPage = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={img} alt="not found" />
        <h3>Oops!...</h3>
        <p>It looks like we can't locate the page you are looking for.</p>
        <Link to="/dashboard">back home</Link>
      </div>
    </Wrapper>
  );
}
export default ErrorPage