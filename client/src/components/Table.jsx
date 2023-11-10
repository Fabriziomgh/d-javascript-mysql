import {
   useReactTable,
   getCoreRowModel,
   flexRender,
   getPaginationRowModel,
   getSortedRowModel,
   getFilteredRowModel,
} from '@tanstack/react-table';
import { LeftArrow, RightArrow } from '../components/Icons';
const Table = ({
   data,
   columns,
   sorting,
   setSorting,
   filtering,
   setFiltering,
}) => {
   const table = useReactTable({
      data: data?.products,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
         sorting,
         globalFilter: filtering,
      },
      onSortingChange: setSorting,
      onGlobalFilterChange: setFiltering,
   });
   return (
      <div>
         <table className="table p-1 bg-white rounded-lg shadow">
            <thead>
               {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                     {headerGroup.headers.map((header) => (
                        <th
                           key={header.id}
                           onClick={header.column.getToggleSortingHandler()}
                           className="border-b-2 py-2 px-2 text-left font-bold  whitespace-nowrap  text-gray-900 bg-red-300"
                        >
                           <div>
                              {header.column.columnDef.header}
                              {
                                 {
                                    asc: '▲',
                                    desc: '▼',
                                 }[header.column.getIsSorted() ?? null]
                              }
                           </div>
                        </th>
                     ))}
                  </tr>
               ))}
            </thead>
            <tbody>
               {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="text-gray-700">
                     {row.getVisibleCells().map((cell) => (
                        <td
                           key={cell.id}
                           className="border-b-2 py-4 px-2 text-xs"
                        >
                           {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                           )}
                        </td>
                     ))}
                  </tr>
               ))}
            </tbody>
            <div className="flex flex-col items-center px-2 py-2 bg-white">
               <div className="flex items-center">
                  <button
                     onClick={() => table.previousPage()}
                     type="button"
                     className="w-full  p-4 text-base text-gray-600 bg-red-400 border rounded-l-xl hover:bg-red-500 transition-colors"
                  >
                     <LeftArrow />
                  </button>

                  <button
                     onClick={() => table.nextPage()}
                     disabled={!table.getCanNextPage()}
                     type="button"
                     className="w-full p-4 text-base text-gray-600 bg-red-400 border-t border-b border-r rounded-r-xl hover:bg-red-500 transition-colors"
                  >
                     <RightArrow />
                  </button>
               </div>
            </div>
         </table>
      </div>
   );
};

export default Table;
