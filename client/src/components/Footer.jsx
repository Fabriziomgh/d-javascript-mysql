const Footer = () => {
   return (
      <footer className=" rounded-lg">
         <div className="w-full mx-auto max-w-screen-xl p-4 ">
            <span className="text-sm text-gray-500">
               © 2024
               <a
                  href="https://www.instagram.com/alcaldiadelostaques/?hl=es-la"
                  target="_blank"
                  className="hover:underline"
               >
                  Alcaldia de los Taques
               </a>
               . Todos los derechos reservados
            </span>
         </div>
      </footer>
   );
};

export default Footer;
