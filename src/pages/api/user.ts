// src/api/user.ts
import axios from "axios";
import {getServerSession} from "next-auth";

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       params: {
//         ...(org_type_id ? {org_type_id} : {}),
//         ...(org_level ? {org_level} : {}),
//       },
//     };

export const testGoogleTokenAuthCall = async () => {
  const baseUrl = "https://qkfmezw7bd.execute-api.us-east-1.amazonaws.com";
  const session = await getServerSession();
  if (!session) {
    throw new Error('No session found');
  }
  const token = session.accessToken;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const res = await axios.get(`${baseUrl}/external-auth`, config);
    console.log(res);
    return res;
  } catch (error) {
    console.error('Failed to create user', error);
    throw error;
  }
}

export const createUser = async (userData: {
  email: string;
  role: string | null;
  firstName: string;
  lastName: string;
}) => {
  try {
    await axios.post('http://localhost:3001/users', userData);
    // const response = await axios.post('http://localhost:3001/users', userData, config);
  } catch (error) {
    console.error('Failed to create user', error);
    throw error;
  }
};

export const updateUserRole = async ({token, role}: {token: string, role: string}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };
  try {
    await axios.patch('http://localhost:3001/users/update-role', {userRole: role}, config)
  } catch (error) {
    console.error('Failed to update user role', error);
    throw error;
  }
}

export const findUserByEmail = async (email: string) => {
  const response = await axios.get(`http://localhost:3001/users/find?email=${email}`)
  return response.data;
};

