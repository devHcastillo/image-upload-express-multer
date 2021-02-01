const uploadModel = require("../model/schema");
const fs = require("fs");

exports.home = async (req, res) => {
  const all_images = await uploadModel.find();
  res.render("main", { images: all_images });
};

exports.uploads = (req, res, next) => {
  const files = req.files;
  if (!files) {
    const error = new Error("Upload some image");
    error.httpStatusCode = 400;
    return next(error);
  }

  //convert images into base64 encoding
  let imgArray = files.map((file) => {
    let img = fs.readFileSync(file.path);
    return (encode_image = img.toString("base64"));
  });

  let result = imgArray.map((src, index) => {
    //create object to store data in the collection
    let finalimg = {
      filename: files[index].originalname,
      contentType: files[index].mimetype,
      imageBase64: src,
    };
    let newUpload = new uploadModel(finalimg);
    return newUpload
      .save()
      .then(() => {
        return {
          msg: `${files[index].originalname} image Uploaded Successfully`,
        };
      })
      .catch((error) => {
        if (error) {
          if (error.name === "MongoError" && error.code === 11000) {
            return Promise.reject({
              error: `Duplicate ${files[index].originalname} `,
            });
          }
          return Promise.reject({ error: error.message || `Cannot Upload` });
        }
      });
  });

  Promise.all(result)
    .then((msg) => {
      res.redirect("/");
    })
    .catch((error) => {
      res.json(error);
    });
};
