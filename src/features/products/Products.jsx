import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/slices/productsSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts()); // Obtiene todos los productos
    }
  }, [dispatch, status]);

  if (status === "loading") return <p>Cargando productos...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Productos</h2>
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow-lg">
            <p className="font-semibold">ID: <span className="text-blue-500">{product.id}</span></p>
            <p><strong>Nombre:</strong> {product.name}</p>
            <p><strong>Descripción:</strong> {product.description}</p>
            <p><strong>Precio:</strong> {product.price}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <p><strong>Categoría:</strong> {product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
