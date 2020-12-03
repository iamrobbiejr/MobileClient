import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'
import queryStringify from 'qs-stringify';
const qs = require('qs-stringify');
const apiUrl = "https://cybers.azurewebsites.net/api";
//const token = JSON.parse(AsyncStorage.getItem("token"));

export  const AuthServices = {
    register,
    login,
    profile,
    update_profile,
    change_password,
}

const config = {
    baseURL: apiUrl,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
     
      "Access-Control-Allow-Origin": "https://cybers.azurewebsites.net",
      "Access-Control-Allow-Credentials": true,
    },
  };

  async function register(data) {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "https://cybers.azurewebsites.net",
        "Access-Control-Allow-Credentials": true,
      },
    };
  
    try {
      let res = await axios.post(
        `${apiUrl}/register`,
        queryStringify(data),
        config
      );
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
  //Register New User
async function login(data) {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    try {
      let res = await axios.post(`${apiUrl}/login`, queryStringify(data), config);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
  async function profile() {
    try {
      let res = await axios.get("/profile", config);
      return res;
    } catch (err) {
      console.error(err);
    }
  }
  async function update_profile(data) {
    try {
      let res = await axios.put("/update_profile", queryStringify(data), config);
      return res;
    } catch (err) {
      console.error(err);
    }
  }
  async function change_password(data) {
    try {
      let res = await axios.put("/changepw", queryStringify(data), config);
      return res;
    } catch (err) {
      console.error(err);
    }
  }
  


