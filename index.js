const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
const config = require('./config/key')

console.log(`config.mongoURI : ${config.mongoURI}`)
//process.env.NODE_ENV = 'production'

mongoose.connect(config.mongoURI, {
  // 에러방지
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! 안녕5')
})

const { User } = require("./models/User")
const bodyParser = require("body-parser")

// application/x-www-form-rulencode를 분석할 수 있도록 설정
app.use(bodyParser.urlencoded({ extended: true }))
// applicate/json을 분석할 수있도록 설정. body가 json으로 파싱됨
app.use(bodyParser.json())
// 회원가입 라우터 작성
app.post('/register', (req, res) => {
  // 클라이언트에서 받은 회원가입 정보를 DB에 저장
  /* User 생성자에 아래와 같은 값으로 mongoose schema 값을 넘겨야 한다.
   * req.body == {"name":"johnahn123","email":"johnahn123@naver.com","password":"1234556"}
   **/
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if (err) {
      console.log(`err : ${err}`)
      return res.json({ success: false, err })
    }

    console.log(`userInfo : ${userInfo}`)

    return res.status(200).json(
      { success: true }
    )
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})