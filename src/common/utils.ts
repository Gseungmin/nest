import { HttpStatus } from '@nestjs/common';

export const ERRORS = {
  USER_ALREADY_EXISTS: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: 10000,
    message: '이미 존재하는 회원입니다.',
  },

  EMAIL_IS_EMPTY: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: 10001,
    message: '이메일을 입력해주세요.',
  },

  NICKNAME_IS_EMPTY: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: 10002,
    message: '닉네임을 입력해주세요.',
  },

  PASSWORD_IS_EMPTY: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: 10003,
    message: '비밀번호를 입력해주세요.',
  },

  EMAIL_IS_INVALIDATE: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: 10004,
    message: '유효한 이메일 주소를 입력해주세요.',
  },

  PASSWORD_TOO_SHORT: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: 10005,
    message: '패스워드는 6자 이상 입력해주세요.',
  },

  LOGIN_FAIL: {
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: 10006,
    message: '이메일과 비밀번호를 확인해주세요.',
  },

  USER_NOT_FOUND: {
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: 10007,
    message: '유저 정보를 조회할 수 없습니다.',
  },

  TITLE_IS_EMPTY: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: 10008,
    message: '제목을 입력해주세요.',
  },

  CONTENT_IS_EMPTY: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: 10009,
    message: '내용을 입력해주세요.',
  },

  POST_NOT_FOUND: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: 10010,
    message: '해당하는 게시물이 존재하지 않습니다.',
  },
};

export const SortRound = 10;

export const USER_GRADE = {
  BASIC: 'BASIC',
  NORMAL: 'NORMAL',
  VIP: 'VIP',
};
