import axios from "axios";

import Constants from "expo-constants";

const { expoConfig } = Constants;

// const uri = `http://${expoConfig?.hostUri!.split(":").shift()}:3000`; 
const uri = 'https://finwise-production-79cf.up.railway.app'
console.log("URI: ", uri);

const fixedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImVtYWlsIjoiZXJpayIsImlhdCI6MTc0NTc2MTczNiwiZXhwIjoxNzQ1ODQ4MTM2fQ.LTLHI2N8raF4_ORejKebnnaiAXwWcDbxIRvEB2A8pTg";

export const api = axios.create({
  baseURL: uri,
  //baseURL: "http://20.121.197.157:2030/api",
  withCredentials: true,

  headers: {
    Authorization: `Bearer ${fixedToken}`, // Adicionando o token no header
  },
});