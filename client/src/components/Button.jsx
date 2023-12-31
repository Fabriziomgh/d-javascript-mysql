const Button = ({ type = 'button', text, onClick }) => {
   return (
      <button
         type={type}
         onClick={onClick}
         className="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
      >
         {text}
      </button>
   );
};

export default Button;
