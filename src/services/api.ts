import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export interface Vehicle {
  id?: number;
  placa: string;
  marca: string;
  modelo: string;
  ano: number;
  cor: string;
}

export const getVehicles = () => api.get<Vehicle[]>('/vehicles');
export const getVehicle = (id: number) => api.get<Vehicle>(`/vehicles/${id}`);
export const createVehicle = (v: Vehicle) => api.post('/vehicles', v);
export const updateVehicle = (id: number, v: Vehicle) => api.put(`/vehicles/${id}`, v);
export const deleteVehicle = (id: number) => api.delete(`/vehicles/${id}`);