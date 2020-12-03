import axios from 'axios';
import queryStringify from 'qs-stringify';
import AsyncStorage from '@react-native-community/async-storage';


const config = {
  baseURL: 'https://cybers.azurewebsites.net/api/student',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhd2FzdHVkZW50QGN5YmVyc2Nob29sLmNvbSIsInJvbGVpZCI6MywidXNlcmlkIjoxMzUsImFjdGl2ZXN1YnNjcmlwdGlvbnMiOjAsImlhdCI6MTU5OTE2ODg3MiwiZXhwIjoxNTk5Mjk4NDcyfQ._KOc9V6w2sMM1iSKv26PZqUIOunxoyAXquHwHSnfkxE',
    Cookie: 'ARRAffinity=a80963775c4d94ae70d427fd076679c1358d55b680ff823849cd8313d0643baa',
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "https://cybers.azurewebsites.net",
    "Access-Control-Allow-Credentials": true,
  }
};
export const TeacherService = {
  get_all_courses,
  get_teacher_pending_classwork,
  get_teacher_unmarked_classwork,
  get_submissions,

  post_material,
  post_assignment,

  get_assignments,
  get_materials,
  enrol_student,
  get_all_students,
};

async function post_material(data) {
  try {
    let res = await axios.post(`/new_material`, queryStringify(data), config);
    return res.data;
  } catch (err) {
    
    console.error(err);
    return [];
  }
}


async function post_assignment(data) {
  try {
    let res = await axios.post(`/new_assignment`, queryStringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  
  }
}


async function get_materials(course_id) {
  //by class id
  try {
    let res = await axios.get(`/get_materials/${course_id}`, config);
    return res.data.data;
  } catch (err) {
    console.error(err);
    return [];
   
  }
}

// classroom
async function get_assignments(course_id) {
  try {
    let res = await axios.get(`/get_assignments/${course_id}`, config);
    return res.data.data;
  } catch (err) {
    console.error(err);
    return [];
    
  }
}


async function get_submissions(id) {
  //by Assingment ID
  try {
    let res = await axios.get(`/get_submissions/${id}`, config);
    return res.data;
  } catch (err) {
  
    console.error(err);
    return [];
  }
}


// get all courses the teacher teaches
async function get_all_courses(teacherid) {
  try {
    let res = await axios.get(`/get_classes/${teacherid}`, config);

    return res.data.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function enrol_student(data) {
  try {
    let res = await axios.post(`/enrol_student`, queryStringify(data), config);
    return res;
  } catch (err) {
    console.error(err);
    return [];
  }
}


//Getting by class ID
async function get_all_students(id) {
  try {
    let res = await axios.get(`/get_students/${id}`, config);
 
      return res.data.data;
    
  } catch (err) {
    console.log('Error getting students '+ err);
    return [];
  }
}

async function get_teacher_pending_classwork(teacher_id, classroom_id) {
  try {
    let res = await axios.get(
      `/teacher/get-all-pending/${teacher_id}/${classroom_id}`,
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function get_teacher_unmarked_classwork(teacher_id, classroom_id) {
  try {
    let res = await axios.get(
      `/teacher/get-all-unmarked/${teacher_id}/${classroom_id}`,
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}
