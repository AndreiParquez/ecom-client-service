import api from '@/api/index.js';
// import { get } from 'node_modules/axios/index.cjs';

const { http } = api;


export default {
  baseUrl: 'http://localhost:8001',
  url: 'api/products',

  http,

  getProducts(page = 1){
    return this.http(this.baseUrl).post(`${this.url}/?page=${page}`);
  }
}

