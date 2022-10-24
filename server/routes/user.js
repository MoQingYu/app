const sha = require("sha1")
const express = require("express");
const router = express.Router();

const UserModel = require("../models/user");
const createResponse = (params) => {
  return {
    status: 200,
    message: null,
    ...params
  }
}


router.post("/signup", function(req, res, next) {
  const {
    username,
    password
  } = req.body;

  const params = {
    name: username,
    password: sha(password)
  }

  UserModel.create(params).then(()=> {
    res.send(
      createResponse({
        status: 200,
        data: true
      })
    )
  }).catch(e=> {
    if(e.message.match("duplicate key")) {
      res.send(
        createResponse({
          status: 200,
          data: false,
          message: "用户已存在"
        })
      )
    }
  })
})

router.post("/signin", function(req, res, next) {
  const {
    username,
    password
  } = req.body;
  ;
  UserModel.getUserByName(username).then((user)=> {
    if(!user) {
      return res.send(
        createResponse({
          data: false,
          message: "用户不存在"
        })
      )
    }
    if(sha(password) !== user.password) {
      return res.send(
        createResponse({
          data: false,
          message: "用户名或密码错误"
        })
      )
    }
    res.send(
      createResponse({
        data: true
      })
    )
  }).catch(next)
})

module.exports = router;