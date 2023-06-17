'use strict';
import express from 'express';
const router = express.Router();
import usersRouter from './users.js';

// 페이지 로딩 함수
router.get('/', (req, res) => {
  res.render('test', {}); // views 폴더 밑에 있는 파일을 참조함
});
router.use('/users', usersRouter);

export default router;
