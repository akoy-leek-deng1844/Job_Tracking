import { Link } from 'react-router-dom';
import { Logo } from '../Components';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage'
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime, cum ipsum voluptates minima cupiditate pariatur. Expedita beatae exercitationem hic amet assumenda ipsa odit voluptatum, pariatur excepturi possimus ea, reprehenderit ad.</p>
          <Link to='/register' className="btn btn-hero">Login/Register</Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
}
export default Landing