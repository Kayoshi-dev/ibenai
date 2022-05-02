import Joi from "joi";

export default Joi.object({
  coverPicture: Joi.array()
    .max(1)
    .message("Cover picture is required")
    .required(),
  title: Joi.string().min(3).max(50).message("Title is required").required(),
  description: Joi.string()
    .min(15)
    .max(500)
    .message("Description is required")
    .required(),
  location: Joi.string()
    .min(3)
    .max(250)
    .message("Location is required")
    .required(),
  startDate: Joi.date()
    .greater(Date.now())
    .message("Starting date is required")
    .required(),
  startTime: Joi.date().allow(null, ""),
  endDate: Joi.date().min(Joi.ref("startDate")).required(),
  endTime: Joi.date().allow(null, ""),
  position: Joi.object({
    lat: Joi.number().required(),
    lng: Joi.number().required(),
  }).required(),
});
