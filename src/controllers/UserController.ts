import { NextFunction, Request, Response } from 'express';
import { errorResponse } from '../utils';
import { loginForm, MessagePayLoad, registerForm, RequestIF, User } from '../models';
import { UserService } from '../services';

export const UserController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = registerForm(req.body);
      if (error) throw { msg: error.details[0].message } as MessagePayLoad;

      const data = await UserService.register(req.body);
      if ((data as MessagePayLoad).msg) {
        throw data;
      }
      const response = await UserService.handleResponse(data as User);
      res.json(response);
    } catch (error) {
      next(errorResponse(error));
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = loginForm(req.body);
      if (error) throw { msg: error.details[0].message } as MessagePayLoad;
      const data = await UserService.login(req.body);
      if ((data as MessagePayLoad).msg) {
        throw data;
      }
      const response = await UserService.handleResponse(data as User);
      res.json(response);
    } catch (error) {
      next(errorResponse(error));
    }
  },
  profile: async (req: RequestIF, res: Response, next: NextFunction) => {
    try {
      const data = await UserService.profile(req.userId as number);
      if ((data as MessagePayLoad).msg) {
        throw data;
      }
      const response = await UserService.handleResponse(data as User);
      res.json(response);
    } catch (error) {
      next(errorResponse(error));
    }
  },
};