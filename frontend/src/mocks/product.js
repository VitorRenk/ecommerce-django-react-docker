import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class ProductAPI {
  async getProductList(keyword = '', pageNumber = '') {
    try {
      const { data } = await axios.get(`${API_URL}/api/products/`, {
        params: {
          keyword: keyword || undefined, // só envia se tiver valor
          page: pageNumber || undefined,
        },
      });
      return data;
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }

  async getProductDetails(productId) {
    try {
      const { data } = await axios.get(`${API_URL}/api/products/${productId}/`);
      return data;
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }

  async createProductReview(productId, review) {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo ? userInfo.token : null;

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/products/${productId}/reviews/`,
        review,
        config
      );
      return data;
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }

  async getTopRatedProducts() {
    try {
      const { data } = await axios.get(`${API_URL}/api/products/top/`);
      return data;
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }
}

const productAPI = new ProductAPI();

export default productAPI;
