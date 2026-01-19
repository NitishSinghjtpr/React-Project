import jwt from 'jsonwebtoken';
import AppError from '../utils/error.util.js';

const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      new AppError("Unauthenticated, please login again", 401)
    );
  }

  const payload = jwt.verify(token, process.env.SECRET_KEY);
  req.user = payload;
  next();
};


export default isLoggedIn;
