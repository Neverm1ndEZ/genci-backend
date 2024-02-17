import pkg from 'jsonwebtoken';
const { sign } = pkg;
import { jwtSecretKey, jwtVerifyEmailKey, refreshTokenSecretKey } from '../../config/index.js';

export function signAccessToken(userId) {
  const accessToken = sign(
    { _id: userId },
    jwtSecretKey,
    {
      expiresIn: '7d',
    }
  );
  return accessToken;
}
export function signRefreshToken(userId) {
  const refreshToken = sign(
    { _id: userId },
    refreshTokenSecretKey,
    {
      expiresIn: '7d',
    }
  );
  return refreshToken;
}
export function signConfirmToken(userId) {
  const confirmToken = sign(
    { _id: userId, },
    jwtSecretKey,
    {
      expiresIn: '15m',
    }
  );
  return confirmToken;
}
export function signVerifyEmailToken(userId) {
  const confirmToken = sign(
    { _id: userId, },
    jwtVerifyEmailKey,
    {
      expiresIn: '1h',
    }
  );
  return confirmToken;
}
