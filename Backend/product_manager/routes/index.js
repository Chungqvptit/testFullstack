var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: 'chung123',
  port: 5432,
})

/* GET home page. */
router.get('/', function(req, res, next) {});
router.get('/getdata', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  pool.query('SELECT * FROM product_info', (error, response) => {
    if(error){
      console.log(error);
    }else{
      res.send(response.rows);
    }
  })
});
router.get('/add', function(req, res, next) {
  res.render('add',{});
});
router.post('/add',function(req, res, next) {

  var product_name=req.body.product_name,
  product_price=req.body.product_price;
  pool.query('INSERT INTO product_info (product_name,product_price) values ($1,$2)',[product_name,product_price],(err,response)=>{
    if(err){
      console.log(err);
    }else{
      res.send('nhan duoc du lieu roi '+product_name+product_price);
    }
  })
  
});
module.exports = router;
