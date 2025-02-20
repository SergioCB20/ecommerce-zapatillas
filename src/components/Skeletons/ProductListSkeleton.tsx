const ProductListSkeleton = () => {
    return (
      <div className="flex flex-col items-center p-6">
        <div className="w-full flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold mb-6 bg-gray-300 h-8 w-40 rounded animate-pulse"></h1>
          <div className="px-4 py-2 bg-gray-300 rounded-md w-32 h-10 animate-pulse"></div>
        </div>
        <table className="w-full md:w-[60%] border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Nombre</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="border-b animate-pulse">
                <td className="text-center p-2">
                  <div className="bg-gray-300 h-6 w-32 rounded"></div>
                </td>
                <td className="text-center p-2">
                  <div className="bg-gray-300 h-6 w-16 rounded"></div>
                </td>
                <td className="text-center p-2">
                  <div className="bg-gray-300 h-6 w-12 rounded"></div>
                </td>
                <td className="text-center p-2 flex justify-center gap-2">
                  <div className="bg-gray-300 h-8 w-16 rounded"></div>
                  <div className="bg-gray-300 h-8 w-16 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default ProductListSkeleton;
  