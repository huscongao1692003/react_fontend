import axios from "axios";

export const fetchCategories = async () => {
  try {
    const response = await axios.get(
      "https://drawproject-production.up.railway.app/api/v1/category"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const searchPostsByKeyword = async (keyword) => {
  try {
    const response = await axios.get(
      `https://drawproject-production.up.railway.app/api/v1/post/search?page=1&perPage=5`,
      {
        params: {
          search: keyword,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const searchPostsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(
      `https://drawproject-production.up.railway.app/api/v1/post/search?page=1&perPage=5`,
      {
        params: {
          categoryId: categoryId,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
