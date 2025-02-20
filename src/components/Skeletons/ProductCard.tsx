export const ProductCardSkeleton = () => {
    return (
      <div className="w-full animate-pulse space-y-4">
        {/* Imagen */}
        <div className="w-full h-40 bg-gray-300 rounded-lg"></div>
        {/* Título */}
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        {/* Precio */}
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    );
  };
  
  export default ProductCardSkeleton;
  