const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "savings-account"; // Folder name in Cloudinary
    return {
      folder,
      resource_type: "auto", // allows images, pdfs, etc.
      public_id: file.fieldname + "-" + Date.now(),
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
