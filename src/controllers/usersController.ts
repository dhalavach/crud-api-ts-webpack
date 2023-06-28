import {
  getAllUsers,
  getUserById,
  create,
  update,
  remove,
  // @ts-ignore TS6133
} from '../models/usersModel.ts';
// @ts-ignore TS6133
import { getPostData, checkIfRequiredFieldsArePresent } from '../helpers.ts';
import { isUuid } from 'uuidv4';

// const isUuid = (id: string) => {
//   return !!id;
// };

export const getUsers = async (res: any) => {
  try {
    const users = await getAllUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (res: any, id: string) => {
  try {
    if (!isUuid(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({ message: 'User id is not valid (not a uuid)!' })
      );
    } else {
      const user = await getUserById(id);
      if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found!' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const createUser = async (req: any, res: any) => {
  try {
    const body = await getPostData(req);

    const { username, age, hobbies } = JSON.parse(body);

    const user = {
      username,
      age,
      hobbies,
    };

    if (checkIfRequiredFieldsArePresent(user)) {
      const newUser = await create(user);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(newUser));
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(
        JSON.stringify({
          message:
            'Fields username (string), age (number), and hobbies (array or empty array) are required',
        })
      );
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (req: any, res: any, id: string) => {
  try {
    if (!isUuid(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'user id is not a valid UUID' }));
    } else {
      const user = await getUserById(id);

      if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
      } else {
        const body = await getPostData(req);

        const { username, age, hobbies } = JSON.parse(body);

        const userData = {
          username: username || user.username,
          age: age || user.age,
          hobbies: hobbies || user.hobbies,
        };

        const updUser = await update(id, userData);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(updUser));
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (res: any, id: string) => {
  try {
    if (!isUuid(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'user id is not a valid UUID' }));
    } else {
      const user = await getUserById(id);

      if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
      } else {
        await remove(id);
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `User ${id} removed` }));
      }
    }
  } catch (err) {
    console.log(err);
  }
};
