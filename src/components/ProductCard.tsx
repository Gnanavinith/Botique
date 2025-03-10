import React from 'react';
import { Product } from '../types';
import { useStore } from '../store';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[400px] object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-90 transform translate-y-full group-hover:translate-y-0 transition duration-500">
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <p className="text-gray-600">${product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="mt-2 bg-black text-white px-4 py-2 w-full hover:bg-gray-800 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};