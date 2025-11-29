import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import '../css/footer.css';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="rounded-bottom-0 pb-6 pt-9 rounded3 position-relative text-xl-start">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="footer-logo-image text-lg-start mb-1">
              <img src="Unicharge_logo.png" alt="footer logo" className="w-lg-20 w-md-20 w-20" />
              <img src="Unicharge_logo_text.png" alt="footer logo" className="w-lg-50 w-md-50 w-50" />
            </div>
            <p className="mb-3">Leading EV revolution in India with reliable charging.</p>
            <div className="socialIcons">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          <div className="footerHead col-lg-2">
            <h5>Quick Links</h5>
            <ul className="footerLinks">
              <li>
                {/* Use NavLink instead of <a>. The 'to' prop replaces 'href' */}
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/services">Services</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
          </div>
          <div className="footerHead col-lg-3">
            <h5>Services</h5>
            <ul className="footerLinks">
              
              <li>
                Public Stations
              </li>
              <li>
                Fleet Solutions
              </li>
              <li>
                Commercial Hubs
              </li>
              <li>
                Maintenance
              </li>
            </ul>
          </div>
          <div className="footerHead col-lg-3">
            <h5>Contact</h5>
            <ul className="footerLinks">
              <li>
                <FaMapMarkerAlt /> Bhubaneswar, India
              </li>
              <li>
                <FaPhone /> +91 6370788763
              </li>
              <li>
                <FaEnvelope /> unichargeofficial@gmail.com
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>© 2025 UniCharge. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;