import axios from "axios";

import Constants from "expo-constants";

const { expoConfig } = Constants;

// const uri = `http://${expoConfig?.hostUri!.split(":").shift()}:3000`; 
const uri = 'https://finwise-production-79cf.up.railway.app'

export const api = axios.create({
  baseURL: uri,
  //baseURL: "http://20.121.197.157:2030/api",
  withCredentials: true,
});

export function setApiToken(token: string | null) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

export function hasToken() {
  return api.defaults.headers.common['Authorization'] != undefined
}