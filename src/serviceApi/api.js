import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

axios.defaults.params = {
  key: '24201171-f795c334c12b489d5c6645c6d',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const getImages = async (search, page) => {
  const { data } = await axios.get(`?q=${search}&page=${page}`);
  return data;
};

export default getImages;
