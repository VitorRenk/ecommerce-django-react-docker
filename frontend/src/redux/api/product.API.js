const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const getProductList = async (keyword = '', pageNumber = '') => {
  const response = await fetch(`${API_URL}/api/products?keyword=${keyword}&page=${pageNumber}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Erro ao buscar lista de produtos');
  }
  return response.json();
};

const getProductDetails = async (id) => {
  const response = await fetch(`${API_URL}/api/products/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Erro ao buscar detalhes do produto');
  }
  return response.json();
};

const createProductReview = async (productId, review) => {
  const response = await fetch(`${API_URL}/api/products/${productId}/reviews/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // se autenticação for necessária, insira o token aqui, exemplo:
      // 'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(review),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Erro ao criar avaliação');
  }
  return response.json();
};

const getTopRatedProducts = async () => {
  const response = await fetch(`${API_URL}/api/products/top/`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Erro ao buscar produtos em destaque');
  }
  return response.json();
};

export default {
  getProductList,
  getProductDetails,
  createProductReview,
  getTopRatedProducts,
};
