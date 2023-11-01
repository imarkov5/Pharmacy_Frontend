import "./navbar.scss";
import { Link } from "react-router-dom";

const links = [
  { href: "/", label: "Home" },
  { href: "/pharmacies", label: "Pharmacies" },
  { href: "/prescriptions", label: "Prescriptions" },
  { href: "/pharmacists", label: "Pharmacists" },
];

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="brand">
        <span>PharmacyApp</span>
      </div>
      <div className="menu">
        <ul>
          {links.map((item) => (
            <li key={item.href}>
              <Link to={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
