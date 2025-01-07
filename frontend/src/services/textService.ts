import axios from 'axios';
import { BASE_URL } from '../variables';

export async function fetchText() {
  try {
    const response = await axios.get(`${BASE_URL}/text`);
    return response.data;
  } catch (error) {
    console.error('Ошибки при загрузке текста:', error);
    throw error;
  }
}
