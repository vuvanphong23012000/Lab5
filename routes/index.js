/*var express = require('express');
var router = express.Router();*/

/*var multer = require('multer')*/

//Cach1
/*var upload = multer({dest:'public/upload/'})*/

/*var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round((Math.random() * 1E9))
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
var upload = multer({ storage: storage , limits:{fileSize: 1* 1024*1024,// 1MB
}}).single('avatar')*/

/* GET home page. */

//Cach1
/*router.post('/profile',upload.single('avatar'), function(req, res, next) {
  /!*res.render('index', { title: 'Express' });*!/
  res.send('Ok baby!');
});*/
/*router.post('/profile', function(req, res, next) {

  console.log('Step 1');
  upload(req,res,function (err){
    console.log('Step 2 -' + err.MulterError);

    if (err ){

      res.send('Co loi xay ra: ' + err);
      return;
    }
    else {
      res.send("Loi khong xac dinh");
      return;
    }
    res.send('Con me no, nha nho!');
  });
});*/
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;*/

//chọn nhiều tệp
var express = require('express');
var router = express.Router();


var multer  = require('multer')
/*var upload = multer({ dest: 'public/upload/' })*/



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload')
  },
  filename: function (req, file, cb) {


    var chuoi=file.originalname;
    var duoi=file.originalname.slice(chuoi.length-4,chuoi.length);
    //  if (!duoi.equal('jpg')) {
    // //  req.fileValidationError = 'Only image files are allowed!';
    //    return file.send("ko phải jpg !!!")
    //  }
    if(duoi =='.jpg' || duoi=='.JPG'){
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+chuoi)
    }else {
      cb('khong phải file jpg',null)
    }

  }
})

// var upload = multer({ storage: storage }).single('avatar')
var upload1=multer({
  storage:storage,limits:{
    fileSize:2+1024*1024,
    files:5,
  },




}).array('avatar')

router.post('/profile',function (req
    ,res,next){

  console.log('Step 1');
  upload1(req, res, function (err){

    if(err){
      if (err instanceof multer.MulterError) {
        if(err=='MulterError: Too many files'){
          return res.send("Tối da 5 file !!!")
        }
        if(err=='MulterError: File too large'){
          return res.send("Tối da 2MB !!!")
        }

      }
      res.send(' ' +err);
      return;
    }else {
      res.send('Thành CÔng');
      return;
    }
  });
});
// router.post('/profile',upload.single('avatar'),function (req
//     ,res){
//   res.send('oke roi nhe');
// });

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;