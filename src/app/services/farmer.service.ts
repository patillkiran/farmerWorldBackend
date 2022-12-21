import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
const baseUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  constructor(private http: HttpClient) {   }
  getAllFarmers() {
    return this.http.post(`${baseUrl}/getAllFarmers`, {});
  }
  createFarmer(data) {
    return this.http.post(`${baseUrl}/createFarmer`, data);
  }
  getFarmer(id) {
    return this.http.get(`${baseUrl}/getFarmer/${id}`);
  }

  updateFarmer(id, data) {
    return this.http.patch(`${baseUrl}/updateFarmer/${id}`, data);
  }

  deleteFarmer(id) {
    return this.http.delete(`${baseUrl}/deleteFarmer/${id}`);
  }
}
