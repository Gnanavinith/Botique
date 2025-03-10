import React from 'react';
import { useStore } from '../store';
import { Minus, Plus, X } from 'lucide-react';

export const Cart: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-2xl font-semibold">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 flex flex-col gap-4 h-[calc(100vh-200px)] overflow-y-auto">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border-b pb-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(0, item.quantity - 1))
                    }
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">${totalPrice.toFixed(2)}</span>
          </div>
          <button className="w-full bg-black text-white py-3 hover:bg-gray-800 transition duration-300">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};