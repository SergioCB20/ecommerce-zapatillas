export const ProductPageSkeleton = () => {
    return (
      <div className="flex flex-col md:flex-row justify-center py-20 items-center gap-6 p-6 animate-pulse">
      {/* Imagen del producto (Skeleton) */}
      <div className="w-[400px] h-[400px] bg-gray-300 rounded-xl"></div>

      {/* Información del producto */}
      <div className="flex flex-col gap-4 w-full max-w-md">
        <div className="h-6 w-3/4 bg-gray-300 rounded"></div> {/* Título */}
        <div className="h-4 w-1/4 bg-gray-300 rounded"></div> {/* Precio */}

        <div className="flex items-center gap-2">
          <div className="h-6 w-20 bg-gray-300 rounded"></div> {/* Cantidad */}
          <div className="h-10 w-16 bg-gray-300 rounded"></div> {/* Input */}
        </div>

        <div className="h-4 w-1/3 bg-gray-300 rounded"></div> {/* Stock */}

        <div className="h-10 w-40 bg-gray-300 rounded"></div> {/* Botón */}
      </div>
    </div>
    );
  };