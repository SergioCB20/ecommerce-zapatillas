import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useUser } from "@/context/UserContext";

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (newPercentage: number) => void;
  discountPercentage: number;
}

const DiscountModal = ({ isOpen, onClose, onApply,discountPercentage }: DiscountModalProps) => {
  const [newPercentage, setNewPercentage] = useState<number>(discountPercentage);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!/^\d*$/.test(e.target.value)) {
      return;
    }
    if(e.target.value === ""){
        setNewPercentage(0);
        setErrorMessage("");
        return;
    }
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setNewPercentage(value);
      setErrorMessage("");
    } 
  };

  const handleSubmit = () => {
    if (newPercentage >= 1 && newPercentage <= 100) {
      onApply(newPercentage);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-30 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Modificar Descuento</h2>
        <input
          value={newPercentage}
          onChange={handleInputChange}
          className="w-full border p-2 mb-4"
          placeholder="Nuevo porcentaje de descuento (1-100)"
        />
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-white px-4 py-2 mr-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={!!errorMessage}
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};

interface DiscountButtonProps {
    originalPrice: number;
    discountPercentage: number;
    onApply: (newPorcentage: number) => void;
  }


  export const DiscountButton = ({
    originalPrice,
    discountPercentage,
    onApply,
  }: DiscountButtonProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
    const { user } = useUser();
  
    return (
      <>
        <div className="flex gap-2 items-center bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
          <span>{discountPercentage}% OFF</span>
          {user?.role === "admin" && (
            <PencilSquareIcon
            className="h-5 w-5 hover:cursor-pointer"
            onClick={openModal}
          />
          )}
        </div>
        <DiscountModal
          isOpen={isModalOpen}
          discountPercentage={discountPercentage}
          onClose={closeModal}
          onApply={(newPercentage) => {
            onApply(newPercentage);
          }}
        />
      </>
    );
  };