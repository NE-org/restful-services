import { compare ,genSalt, hash} from 'bcrypt';
import UserModel from '../models/user.model.js';
import {
  createSuccessResponse,
  errorResponse,
  serverErrorResponse,
  successResponse,
} from './../utils/api.response.js';
import { signToken } from '../utils/jwt.utils.js';

export const login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    console.log('Pre-email')
    let findUserByEmail = await UserModel.findOne({
      where: {
        email
      }
    });
    if (!findUserByEmail) return errorResponse("Invalid email or password!", res)

    // const validPassword = await compare(password, findUserByEmail.password);
    // if (!validPassword) return errorResponse('Invalid email or password!', res);
    const token = signToken({ id: findUserByEmail.id });
    console.log(token)

    return successResponse("Login successful!",{access_token: token},res);

  } catch (error) {
    console.log(error?.message)
    return serverErrorResponse(error, res);
  }
};

export const register = async(req,res)=>{
  try{
    let {
      email,
      password,
      names
    } = req.body;

    let findUserByEmail = await UserModel.findOne({
      where: {
        email
      }
    });
    if (findUserByEmail) return errorResponse(`User with email ${email} already exists!`, res)

    const salt = await genSalt(10);
    password = await hash(password, salt);

    const user = await UserModel.create({
      email,
      password,
      names
    })

    return createSuccessResponse("User registered successfully. You can now login", {}, res);

  }
  catch(error){
    return serverErrorResponse(error, res);
  }
}

export const getProfile = async(req,res)=>{
  try{
      let user = await UserModel.findByPk(req.user.id,{attributes: ['email','id','names']});
      if (!user) return errorResponse("User not found!",res);

      return successResponse("Profile",user,res)
  }
  catch (ex) {
      return serverErrorResponse(ex,res)
  }
}

