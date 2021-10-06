const router = require('express').Router();
const mysql = require('./mysql');
const connection = mysql.connection;

const jwt = require('jsonwebtoken');

router.post('/join', (req, res)=>{
    const email = req.body.email;
    console.log("email : ", email);
    console.log("email type : ", typeof(email));
    const userPWD = req.body.userPWD;
    console.log("Password : ", userPWD);
    console.log("email type : ", typeof(userPWD));
    const userName = req.body.userName;
    console.log("name : ", userName);
    console.log("email type : ", typeof(userName));

    connection.query('SELECT COUNT(*) AS userNum FROM musers', async (err, rows)=>{
        if(err) console.log(err);
        console.log('rows usernum : ', rows[0].userNum);

        await connection.query(`INSERT INTO musers VALUE(${rows[0].userNum}, '${email}', '${userPWD}', '${userName}')`, (err, rows)=>{
            if (err) throw err;
            console.log('insert succeed');
            res.json({"result":"success"})
            //res.send('<h1> insert succeed </h1>');
        });
    });
});

router.post('/login', (req, res)=>{
    const email = req.body.email;
    console.log("email : ", email);
    const userPWD = req.body.userPWD;
    console.log("password : ", userPWD);

    console.log("Request param : ", req.params)
    console.log("Request body : ", req.body)
    //console.log("Request : ", req)

    connection.query(`SELECT email, userPwd FROM musers
                        WHERE email='${email}' and userPwd='${userPWD}'`, async (err, rows)=>{
        if(err) throw err;
        if(rows != ""){
            console.log("rows : ", rows);
            const token = jwt.sign({
                pass: email
            },
            "keduit601",
            {
                subject: `${email} jwttoken`,
                expiresIn: '60m',
                issuer: 'Josh'
            });

            console.log("토큰 : \n", token);

            res.json({"token" : token});
        } else {
            res.send("로그인 실패 아이디와 비밀번호를 확인하세요.");
            console.log("로그인 실패 아이디와 비밀번호를 확인하세요.");
        }
    });
});

router.post('/checkToken', (req, res)=>{
    const token = req.body.token;
    try{
        let check = jwt.verify(token, "keduit601");
        if(check){
            console.log("토큰 검증 : ", check.pass);
            res.send("토큰 검증 : " + check.pass);
        }
    } catch(e){
        console.log(e);
        res.send("토큰 만료 됨");
    }
});

module.exports = router;


//-------------------------------디버깅 용--------------------------------------
router.post('/deleteUser', (req, res)=>{
    const muserNum = req.body.userNum;
    console.log("userNum : ", muserNum);

    connection.query(`DELETE FROM musers WHERE userNum=${muserNum}`, (err, rows)=>{
        if(err) throw err;
        console.log('delete succeed');
        res.send('<h1> delete succeed </h1>');
    });
})

router.get('/select', (req, res) =>{
    connection.query('SELECT * FROM musers', (err, rows)=>{
        if (err) throw err;
        console.log('user info : ', rows);
        res.send(rows);
    });
});