// src/api/user.ts
import axios from "axios";

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       params: {
//         ...(org_type_id ? {org_type_id} : {}),
//         ...(org_level ? {org_level} : {}),
//       },
//     };
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

