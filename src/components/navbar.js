import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';

const Navbar = (props) => {
    const {cartItemCount = 0 } = props;

    function ThemeToggle(){

        document.body.classList.toggle("dark-theme");

        if(document.body.classList.contains("dark-theme")){
            localStorage.setItem("site-theme","dark");
        }
        else{
            localStorage.setItem("site-theme","light");
        }

    }

    return (
        <div className="header">
            <div className="logo">
                <img src='/assests/profile-icon-svg-download-png-1722755.webp' alt=""/>
            </div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/">Shop</Link>
                <Link to="/contact">Contact</Link>
            </nav>
            <div className="nav-actions">
                <CartIcon itemCount={cartItemCount} />
                <div className="profile" id="theme-toggle" onClick={ThemeToggle}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-annoyed-icon lucide-annoyed">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 15h8" />
                        <path d="M8 9h2" />
                        <path d="M14 9h2" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Navbar;