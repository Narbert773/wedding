import axios from 'axios';
import { Kid } from '../interfaces/kid.interface';
import { BASE_URL } from '../variables';

export async function fetchAllKids(): Promise<Kid[]> {
  try {
    const response = await axios.get(`${BASE_URL}/kids`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении списка детей:', error);
    throw error;
  }
}

export async function addKid(newKid: Omit<Kid, 'id'>): Promise<void> {
  try {
    await axios.post(`${BASE_URL}/kids`, newKid);
  } catch (error) {
    console.error('Ошибка при добавлении ребенка:', error);
    throw error;
  }
}

export async function removeKid(kid: Kid): Promise<void> {
  try {
    await axios.delete(`${BASE_URL}/kids/${kid.id}`);
  } catch (error) {
    console.error('Ошибка при удалении ребенка:', error);
    throw error;
  }
}

export async function changeKid(kid: Kid): Promise<void> {
  try {
    await axios.patch(`${BASE_URL}/kids/${kid.id}`, {
      firstName: kid.firstName,
      lastName: kid.lastName,
    });
  } catch (error) {
    console.error('Ошибка при редактировании ребенка:', error);
    throw error;
  }
}
