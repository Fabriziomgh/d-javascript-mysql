import { SearchIcon } from '../components/Icons';
import { useEffect, useState } from 'react';
import Table from '../components/Table';
import { useProducts } from '../hooks/products';
const InventarioPage = () => {
   const { products } = useProducts();
   const [sorting, setSorting] = useState([]);
   const [filtering, setFiltering] = useState('');
   const columns = [
      {
         header: 'ID',
         accessorKey: 'producto_id',
      },
      {
         header: 'Producto',
         accessorKey: 'producto',
      },
      {
         header: 'Descripcion',
         accessorKey: 'descripcion',
      },
      {
         header: 'Serial',
         accessorKey: 'serial',
      },
      {
         header: 'Fecha de creacion',
         accessorKey: 'fecha_creacion',
      },
      {
         header: 'Ubicación',
         accessorKey: 'ubicacion',
      },
      {
         header: 'Acciones',
         cell: (row) => (
            <div className="flex gap-2">
               <button
                  onClick={() => console.log('Editar', row)}
                  className="p-1 bg-blue-400 rounded-md"
               >
                  Editar
               </button>
               <button
                  onClick={() =>
                     console.log('Eliminar', row.row.original.producto_id)
                  }
                  className="p-1 bg-red-400 rounded-md"
               >
                  Eliminar
               </button>
            </div>
         ),
      },
   ];

   return (
      <div>
         <div>
            <h2 className="text-2xl font-bold text-center">Inventario</h2>
         </div>

         <div className="flex flex-col items-center">
            <div className="flex flex-col mb-2">
               <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                     <SearchIcon />
                  </span>
                  <input
                     value={filtering}
                     onChange={(e) => setFiltering(e.target.value)}
                     type="text"
                     className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2  focus:border-transparent"
                     placeholder="Buscar..."
                  />
               </div>
            </div>
            <Table
               data={products}
               columns={columns}
               filtering={filtering}
               setFiltering={setFiltering}
               sorting={sorting}
               setSorting={setSorting}
            />
         </div>
      </div>
   );
};

export default InventarioPage;
