import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/slices/productsSlice";
import axios from "axios";

const Products = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const [editingId, setEditingId] = useState(null);

  const { name, description, price, stock, category } = productData;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock);

    if (isNaN(parsedPrice)) {
      console.error("Precio inválido");
      return;
    }

    const newProduct = {
      name,
      description,
      price: parsedPrice,
      stock: parsedStock,
      category,
    };

    try {
      if (editingId) {
        await axios.put(`http://localhost:3300/products/${editingId}`, newProduct);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:3300/products", newProduct);
      }

      setProductData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
      });
      dispatch(fetchProducts());
    } catch (error) {
      console.error("Error al procesar el producto:", error.message);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setProductData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3300/products/${id}`);
      dispatch(fetchProducts());
    } catch (error) {
      console.error("Error al eliminar producto:", error.message);
    }
  };

  if (status === "loading") return <p className="text-center text-lg font-semibold text-gray-500">Cargando productos...</p>;
  if (status === "failed") return <p className="text-center text-lg font-semibold text-red-500">Error: {error}</p>;

  return (
    <div className="bg-gradient-to-r from-blue-100 to-teal-100 p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulario de producto */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {editingId ? "Editar Producto" : "Agregar Nuevo Producto"}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-gray-600 text-sm font-semibold" htmlFor="name">
                Nombre:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleInputChange}
                className="w-full p-4 border-2 border-gray-400 rounded-lg mt-2 text-gray-800"
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-600 text-sm font-semibold" htmlFor="description">
                Descripción:
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={handleInputChange}
                className="w-full p-4 border-2 border-gray-400 rounded-lg mt-2 text-gray-800"
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-600 text-sm font-semibold" htmlFor="price">
                Precio:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={handleInputChange}
                className="w-full p-4 border-2 border-gray-400 rounded-lg mt-2 text-gray-800"
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-600 text-sm font-semibold" htmlFor="stock">
                Cantidad:
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={stock}
                onChange={handleInputChange}
                className="w-full p-4 border-2 border-gray-400 rounded-lg mt-2 text-gray-800"
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-600 text-sm font-semibold" htmlFor="category">
                Categoría:
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={category}
                onChange={handleInputChange}
                className="w-full p-4 border-2 border-gray-400 rounded-lg mt-2 text-gray-800"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
            >
              {editingId ? "Actualizar Producto" : "Agregar Producto"}
            </button>
          </form>
        </div>

        {/* Lista de productos */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Lista de Productos</h2>
          <div className="space-y-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                <p className="font-semibold text-gray-700">
                  <span className="text-indigo-600">ID:</span> {product.id}
                </p>
                <p className="text-gray-600 mt-2">
                  <strong>Nombre:</strong> {product.name}
                </p>
                <p className="text-gray-600 mt-2">
                  <strong>Descripción:</strong> {product.description}
                </p>
                <p className="text-gray-600 mt-2">
                  <strong>Precio:</strong> ${product.price.toFixed(2)}
                </p>
                <p className="text-gray-600 mt-2">
                  <strong>Cantidad:</strong> {product.stock}
                </p>
                <p className="text-gray-600 mt-2">
                  <strong>Categoría:</strong> {product.category}
                </p>
                <div className="mt-6 flex justify-around">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
