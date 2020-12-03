import {Platform} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import queryStringify from 'qs-stringify';
import {Buffer} from 'buffer';

const FormData = require('form-data');
const data = new FormData();

//TOKEN HERE
//const token =
//  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhd2FzdHVkZW50QGN5YmVyc2Nob29sLmNvbSIsInJvbGVpZCI6MywidXNlcmlkIjoxMzUsImFjdGl2ZXN1YnNjcmlwdGlvbnMiOjAsImlhdCI6MTYwMDMyNjQ3NSwiZXhwIjoxNjAwNDU2MDc1fQ.m4Uk9-ArzZL_Etg0MNmCd6O2_VY5PWbXQTMfBkw0jws';

export const options = {
  responseType: 'arraybuffer',
};

export const endpoint = '/upload/get';
export const StudentService = {
  get_all_courses,
  get_course_downloadables,
  get_course_video_resources,
  get_student_pending_classwork,
  get_student_marked_classwork,
  get_student_all_classwork,
  download,
  downloadPDF,
  downloadFile,
  deleteResource,
  submit_assignment,
  get_all_tags,
};

async function download(file) {
  const value = await AsyncStorage.getItem('token');
  const Attach = 'Bearer ' + value;
  const api = axios.create({
    baseURL: 'https://pawacyberschool.net/api',
    headers: {
      Authorization: Attach,

      Cookie:
        'ARRAffinity=a80963775c4d94ae70d427fd076679c1358d55b680ff823849cd8313d0643baa',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': 'https://cybers.azurewebsites.net',
      'Access-Control-Allow-Credentials': true,
    },
  });

  let data = queryStringify({file: file});
  const response = await api.post(endpoint, data, options);
  const buff = Buffer.from(response.data, 'base64');
  return buff.toString('base64');
}
async function downloadPDF(file) {
  const value = await AsyncStorage.getItem('token');
  const Attach = 'Bearer ' + value;
  const api = axios.create({
    baseURL: 'https://pawacyberschool.net/api',
    headers: {
      Authorization: Attach,

      Cookie:
        'ARRAffinity=a80963775c4d94ae70d427fd076679c1358d55b680ff823849cd8313d0643baa',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': 'https://cybers.azurewebsites.net',
      'Access-Control-Allow-Credentials': true,
    },
  });

  let data = queryStringify({file: file});
  const response = await api.post(endpoint, data, options);
  return response.data;
}

async function downloadFile(url) {
  const token = await AsyncStorage.getItem('token');
  return RNFetchBlob.config({
    fileCache: true,
    // by adding this option, the temp files will have a file extension
    appendExt: 'pdf',
  })
    .fetch('GET', url, {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': 'https://pawacyberschool.net',
      'Access-Control-Allow-Credentials': 'true',
    })
    .then((res) => {
      return res;
    });
}
async function submit_assignment(data) {
  const value = await AsyncStorage.getItem('token');
  const Attach = 'Bearer ' + value;
  const configs = {
    method: 'get',
    baseURL: 'https://cybers.azurewebsites.net/api/student',
    headers: {
      Authorization: Attach,

      Cookie:
        'ARRAffinity=a80963775c4d94ae70d427fd076679c1358d55b680ff823849cd8313d0643baa',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': 'https://cybers.azurewebsites.net',
      'Access-Control-Allow-Credentials': true,
    },
    data: data,
  };

  try {
    let res = await axios.post(
      `/new_submission`,
      queryStringify(data),
      configs,
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function deleteResource(data) {
  try {
    let res = await axios.delete(
      `https://cybers.azurewebsites.net/api/upload/delete`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        data: data,
      },
    );

    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

// // Student Course Resources Services
async function get_all_courses(student_id) {
  const value = await AsyncStorage.getItem('token');
  const Attach = 'Bearer ' + value;
  const configs = {
    method: 'get',
    baseURL: 'https://cybers.azurewebsites.net/api/student',
    headers: {
      Authorization: Attach,

      Cookie:
        'ARRAffinity=a80963775c4d94ae70d427fd076679c1358d55b680ff823849cd8313d0643baa',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': 'https://cybers.azurewebsites.net',
      'Access-Control-Allow-Credentials': true,
    },
    data: data,
  };
  try {
    let res = await axios.get(`/get_classes/${student_id}`, configs);
    return res.data.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function get_course_downloadables(course_id) {
  const value = await AsyncStorage.getItem('token');
  const Attach = 'Bearer ' + value;
  const configs = {
    method: 'get',
    baseURL: 'https://cybers.azurewebsites.net/api/student',
    headers: {
      Authorization: Attach,

      Cookie:
        'ARRAffinity=a80963775c4d94ae70d427fd076679c1358d55b680ff823849cd8313d0643baa',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': 'https://cybers.azurewebsites.net',
      'Access-Control-Allow-Credentials': true,
    },
    data: data,
  };
  try {
    let res = await axios.get(`/get_materials/${course_id}`, configs);
    return res.data.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function get_course_video_resources(course_id) {
  const value = await AsyncStorage.getItem('token');
  const Attach = 'Bearer ' + value;
  const configs = {
    method: 'get',
    baseURL: 'https://cybers.azurewebsites.net/api/student',
    headers: {
      Authorization: Attach,

      Cookie:
        'ARRAffinity=a80963775c4d94ae70d427fd076679c1358d55b680ff823849cd8313d0643baa',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': 'https://cybers.azurewebsites.net',
      'Access-Control-Allow-Credentials': true,
    },
    data: data,
  };
  try {
    let res = await axios.get(`/get_videos/${course_id}`, configs);
    return res.data;
  } catch (err) {
    console.error(err);

    return [];

    // return [{
    //   id: 1,
    //   title: "Check Connection...",
    //   videoLink: ""
    // }, ];
  }
}

async function get_all_tags() {
  const value = await AsyncStorage.getItem('token');
  const Attach = 'Bearer ' + value;
  const configs = {
    method: 'get',
    baseURL: 'https://cybers.azurewebsites.net/api/tags',
    headers: {
      Authorization: Attach,

      Cookie:
        'ARRAffinity=a80963775c4d94ae70d427fd076679c1358d55b680ff823849cd8313d0643baa',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': 'https://cybers.azurewebsites.net',
      'Access-Control-Allow-Credentials': true,
    },
    data: data,
  };
  try {
    let res = await axios.get(`/all_tags`, configs);
    return res.data.data.tags;
  } catch (err) {
    console.error(err);
    return [];
  }
}

//per course
async function get_student_all_classwork(course_id) {
  const value = await AsyncStorage.getItem('token');
  const Attach = 'Bearer ' + value;
  const configs = {
    method: 'get',
    baseURL: 'https://cybers.azurewebsites.net/api/student',
    headers: {
      Authorization: Attach,

      Cookie:
        'ARRAffinity=a80963775c4d94ae70d427fd076679c1358d55b680ff823849cd8313d0643baa',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': 'https://cybers.azurewebsites.net',
      'Access-Control-Allow-Credentials': true,
    },
    data: data,
  };
  try {
    let res = await axios.get(`/get_assignments/${course_id}`, configs);
    console.log(res.data.data);

    return res.data.data;
  } catch (err) {
    // console.error(err);
    return [];
  }
}

// get pending assignments all undone
async function get_student_pending_classwork(student_id) {
  const value = await AsyncStorage.getItem('token');
  const Attach = 'Bearer ' + value;
  const configs = {
    method: 'get',
    baseURL: 'https://cybers.azurewebsites.net/api/student',
    headers: {
      Authorization: Attach,

      Cookie:
        'ARRAffinity=a80963775c4d94ae70d427fd076679c1358d55b680ff823849cd8313d0643baa',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': 'https://cybers.azurewebsites.net',
      'Access-Control-Allow-Credentials': true,
    },
    data: data,
  };
  try {
    let res = await axios.get(
      `/get_pending_assignments/${student_id}`,
      configs,
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    // console.error(err);
    return [];
  }
}

//all graded assigments
async function get_student_marked_classwork(student_id) {
  const value = await AsyncStorage.getItem('token');
  const Attach = 'Bearer ' + value;
  const configs = {
    method: 'get',
    baseURL: 'https://cybers.azurewebsites.net/api/student',
    headers: {
      Authorization: Attach,

      Cookie:
        'ARRAffinity=a80963775c4d94ae70d427fd076679c1358d55b680ff823849cd8313d0643baa',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': 'https://cybers.azurewebsites.net',
      'Access-Control-Allow-Credentials': true,
    },
    data: data,
  };
  try {
    let res = await axios(`/student/get-all-marked/${student_id}`, configs);
    return res.data;
  } catch (err) {
    // console.error(err);

    return null;
  }
}
