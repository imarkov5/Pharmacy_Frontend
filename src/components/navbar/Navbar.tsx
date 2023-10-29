import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";

const links = [
  { href: "/", label: "Home" },
  { href: "/pharmacies", label: "Pharmacies" },
  { href: "/prescriptions", label: "Prescriptions" },
  { href: "/pharmacists", label: "Pharmacists" },
];

const Navbar = () => {
  const navigate= useNavigate();
  return (
    <div className="navbar">
      <div className="brand">
        <span>PharmacyApp</span>
      </div>
      <div className="menu">
        <ul>
          {links.map((item) => (
            <li key={item.href}>
              {/* <Link to={item.href}>{item.label}</Link> */}
              <Link to={item.href} onClick={() => {navigate(item.href); navigate(0)}}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
