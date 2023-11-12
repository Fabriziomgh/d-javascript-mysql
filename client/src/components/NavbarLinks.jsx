import { Link } from 'react-router-dom';

const NavbarLinks = ({ link, text, children }) => {
   return (
      <Link
         className="hover:text-gray-800 hover:scale-105 hover:bg-red-300 rounded-sm flex items-center p-2 my-6  transition-all   text-gray-800  "
         to={link}
      >
         <div>{children}</div>
         <span className="mx-4 text-lg font-normal">{text}</span>
      </Link>
   );
};

export default NavbarLinks;
