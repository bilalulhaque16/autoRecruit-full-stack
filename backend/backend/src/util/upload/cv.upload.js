import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // if (
  //   file.mimetype === "image/jpeg" ||
  //   file.mimetype === "image/png" ||
  //   file.mimetype === "image/jpg"
  // ) {
  //   cb(null, true);
  // } else {
  //   cb(null, false);
  //   return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  // }


  if (
    file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "text/plain"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .pdf, .docs and .txt format allowed!"));
  }
  
};
const cvUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});



let fileName;
const diskStorage = multer.diskStorage({
destination: function (req, file, cb) {
  cb(null, './uploads/');
},
filename: function (req, file, cb) {
  const identifier = Math.random().toString().replace(/0\./, ""); 
  fileName = `${identifier}-${file.originalname}`
  cb(null, fileName);
}
});

const aiCvUpload = multer({ storage: diskStorage });


export {cvUpload, aiCvUpload};
