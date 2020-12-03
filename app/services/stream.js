import axios from "axios";
import queryStringify from 'qs-stringify';
import AsyncStorage from '@react-native-community/async-storage';
import React,  { useState } from 'react';
// const token = JSON.parse(localStorage.getItem("token"));
// const apiUrl = "http://localhost:3001/api";

// var config = {
//     baseURL: "https://pawacyberschool.net/api",
//     headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization: `Bearer ${token}`,
//         "Access-Control-Allow-Origin": "https://pawacyberschool.net",
//         "Access-Control-Allow-Credentials": true,
//     },
// };
const FormData = require('form-data');
const data = new FormData();

export const StreamService = {
    create_meeting,
    start_meeting,
    stop_meeting,
    get_meeting,
    get_meetings,
    get_meetings_by_classid,
    get_meetings_by_creatorid,
};

async function create_meeting(data) {
    const value = await AsyncStorage.getItem('token');
    const Attach = "Bearer "+value;
    const configs = {
        method: 'get',
        baseURL: "https://pawacyberschool.net/api",
        headers: {
            Authorization: Attach,

            Cookie: 'ARRAffinity=a80963775c4d94ae70d427fd076679c1358d55b680ff823849cd8313d0643baa',
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "https://cybers.azurewebsites.net",
            "Access-Control-Allow-Credentials": true,
        },
        data: data
    };
    try {
        let res = await axios.post(`/create_meeting`,queryStringify(data), configs);
        return res;
    } catch (err) {
        console.error(err);
    }
}
async function start_meeting(id, data) {

    const value = await AsyncStorage.getItem('token');
    const Attach = "Bearer "+value;
    const configs = {
        method: 'get',
        baseURL: "https://pawacyberschool.net/api",
        headers: {
            Authorization: Attach,

            Cookie: 'ARRAffinity=a80963775c4d94ae70d427fd076679c1358d55b680ff823849cd8313d0643baa',
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "https://cybers.azurewebsites.net",
            "Access-Control-Allow-Credentials": true,
        },
        data: data
    };
    try {
        let res = await axios.put(
            `/start_meeting/${id}`,
            queryStringify(data),
            configs
        );
        return res;
    } catch (err) {
        console.error(err);
    }
}
async function stop_meeting(id) {

    const value = await AsyncStorage.getItem('token');
    const Attach = "Bearer "+value;
    const configs = {
        method: 'get',
        baseURL: "https://pawacyberschool.net/api",
        headers: {
            Authorization: Attach,

            Cookie: 'ARRAffinity=a80963775c4d94ae70d427fd076679c1358d55b680ff823849cd8313d0643baa',
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "https://cybers.azurewebsites.net",
            "Access-Control-Allow-Credentials": true,
        },
        data: data
    };
    try {
        const data = {
            status: "Meeting Ended",
        };
        let res = await axios.put(`/stop_meeting/${id}`, data, configs);
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
    }
}

async function get_meeting(id) {
    const value = await AsyncStorage.getItem('token');
    const Attach = "Bearer "+value;
    const configs = {
        method: 'get',
        baseURL: "https://pawacyberschool.net/api",
        headers: {
            Authorization: Attach,

            Cookie: 'ARRAffinity=a80963775c4d94ae70d427fd076679c1358d55b680ff823849cd8313d0643baa',
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "https://cybers.azurewebsites.net",
            "Access-Control-Allow-Credentials": true,
        },
        data: data
    };
    try {
        let res = await axios.get(`/get_meeting/${id}`, configs);
        return res;
    } catch (err) {
        console.error(err);
    }
}

async function get_meetings() {
    const value = await AsyncStorage.getItem('token');
    const Attach = "Bearer "+value;
    const configs = {
        method: 'get',
        baseURL: "https://pawacyberschool.net/api",
        headers: {
            Authorization: Attach,

            Cookie: 'ARRAffinity=a80963775c4d94ae70d427fd076679c1358d55b680ff823849cd8313d0643baa',
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "https://cybers.azurewebsites.net",
            "Access-Control-Allow-Credentials": true,
        },
        data: data
    };
    try {
        let res = await axios.get(`/get_meetings`, configs);
        return res;
    } catch (err) {
        console.error(err);
    }
}
async function get_meetings_by_classid(id) {
    const value = await AsyncStorage.getItem('token');
    const Attach = "Bearer "+value;
    const configs = {
        method: 'get',
        baseURL: "https://pawacyberschool.net/api",
        headers: {
            Authorization: Attach,

            Cookie: 'ARRAffinity=a80963775c4d94ae70d427fd076679c1358d55b680ff823849cd8313d0643baa',
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "https://cybers.azurewebsites.net",
            "Access-Control-Allow-Credentials": true,
        },
        data: data
    };
    try {
        let res = await axios.get(`/get_meetings/${id}`, configs);
        return res;
    } catch (err) {
        console.error(err);
    }
}
async function get_meetings_by_creatorid(id) {
    const value = await AsyncStorage.getItem('token');
    const Attach = "Bearer "+value;
    const configs = {
        method: 'get',
        baseURL: "https://pawacyberschool.net/api",
        headers: {
            Authorization: Attach,

            Cookie: 'ARRAffinity=a80963775c4d94ae70d427fd076679c1358d55b680ff823849cd8313d0643baa',
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "https://cybers.azurewebsites.net",
            "Access-Control-Allow-Credentials": true,
        },
        data: data
    };
    try {
        let res = await axios.get(`/get_meetings/${id}`, configs);
        return res;
    } catch (err) {
        console.error(err);
    }
}