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
      <div className="py-4">
         <table className="min-w-full divide-y-2 shadow-lg rounded-lg divide-gray-200 bg-white text-sm">
            <thead className="text-left ">
               {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup?.id}>
                     {headerGroup?.headers?.map((header) => (
                        <th
                           key={header?.id}
                           onClick={header?.column?.getToggleSortingHandler()}
                           className="whitespace-nowrap font-bold px-4 py-2  text-gray-900"
                        >
                           <div>
                              {header?.column?.columnDef?.header}
                              {
                                 {
                                    asc: '▲',
                                    desc: '▼',
                                 }[header?.column?.getIsSorted() ?? null]
                              }
                           </div>
                        </th>
                     ))}
                  </tr>
               ))}
            </thead>
            <tbody className="divide-y divide-gray-200">
               {table.getRowModel().rows?.map((row) => (
                  <tr key={row?.id} className="odd:bg-gray-50">
                     {row.getVisibleCells().map((cell) => (
                        <td
                           key={cell?.id}
                           className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                        >
                           {flexRender(
                              cell?.column?.columnDef?.cell,
                              cell?.getContext()
                           )}
                        </td>
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>

         <div class="inline-flex items-center justify-center bg-red-200  gap-3">
            <button
               onClick={() => table.previousPage()}
               class="inline-flex h-8 w-8 items-center justify-center  border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            >
               <LeftArrow />
            </button>

            <p class="text-xs text-blac font-bold ">
               {`Página ${
                  table.getState().pagination.pageIndex + 1
               } de ${table.getPageCount()}`}
            </p>

            <button
               onClick={() => table.nextPage()}
               disabled={!table.getCanNextPage()}
               class="inline-flex h-8 w-8 items-center justify-center  border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            >
               <RightArrow />
            </button>
         </div>
      </div>
   );
};

export default Table;
