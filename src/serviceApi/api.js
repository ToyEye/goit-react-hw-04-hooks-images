import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const KEY = '24201171-f795c334c12b489d5c6645c6d';
const URI = `/?key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

export const getImages = async (search, page) => {
  const response = await axios.get(`${URI}&q=${search}&page=${page}`);
  return response.data;
};

export default getImages;
