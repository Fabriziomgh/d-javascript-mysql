import ErrorMessage from './ErrorMessage';

const Select = ({
   icon,
   options,
   register,
   name,
   text = 'Seleccionar permisos',
   errors,
}) => {
   return (
      <div>
         <div className="flex relative">
            <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-500 text-gray-500 shadow-sm text-sm">
               {icon}
            </span>
            <select
               {...register}
               name={name}
               className="rounded-r-lg flex-1 appearance-none border border-gray-500 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            >
               <option value="" defaultValue={0}>
                  {text}
               </option>
               {options.map(({ id, text }) => (
                  <option key={id} value={id}>
                     {text}
                  </option>
               ))}
            </select>
         </div>
         {errors && errors[name] && (
            <ErrorMessage error={errors[name].message} />
         )}
      </div>
   );
};

export default Select;
