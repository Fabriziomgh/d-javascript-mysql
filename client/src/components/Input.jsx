import ErrorMessage from '../components/ErrorMessage';
const Input = ({
   type = 'text',
   placeholder,
   icon,
   register,
   name,
   errors,
}) => {
   return (
      <div className="">
         <div className="flex relative">
            <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-500 text-gray-500 shadow-sm text-sm">
               {icon}
            </span>
            <input
               {...register}
               type={type}
               name={name}
               className=" rounded-r-lg flex-1 appearance-none border border-gray-500 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
               placeholder={placeholder}
            />
         </div>
         {errors && errors[name] && (
            <ErrorMessage error={errors[name].message} />
         )}
      </div>
   );
};

export default Input;
