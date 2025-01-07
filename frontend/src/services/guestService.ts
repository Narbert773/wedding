import axios from 'axios';
import { Guest } from '../interfaces/guest.interface';
import { BASE_URL } from '../variables';

export async function getAllAdults(): Promise<Guest[]> {
  try {
    const response = await axios.get(`${BASE_URL}/guests`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении списка гостей:', error);
    throw error;
  }
}

export async function addGuest(newGuest: Omit<Guest, 'id'>): Promise<void> {
  try {
    await axios.post(`${BASE_URL}/guests`, newGuest);
  } catch (error) {
    console.error('Ошибка при добавлении гостя:', error);
    throw error;
  }
}

export async function removeGuest(guest: Guest): Promise<void> {
  try {
    await axios.delete(`${BASE_URL}/guests/${guest.id}`);
  } catch (error) {
    console.error('Ошибка при удалении гостя:', error);
    throw error;
  }
}
