import multer from "multer";

// multer.diskStorage -> Sana verilen verileri gecici hafizada tut, sonrasinda onu kullanacagiz.
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    console.log("FILe FROM MULTER : " , file)
    cb(null, file.originalname);
  }, 
});

// yukaridaki ayarlara sahip bir multer ornegi olustur
const upload = multer({
  storage: storage,
});

export default upload;
