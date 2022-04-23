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
  address: Joi.string()
    .min(3)
    .max(250)
    .message("Address is required")
    .required(),
  dateStart: Joi.date()
    .greater(Date.now())
    .message("Starting date is required")
    .required(),
  timeStart: Joi.string().allow(null, ""),
  dateEnd: Joi.date().min(Joi.ref("dateStart")).required(),
  timeEnd: Joi.string().allow(null, ""),
  position: Joi.object({
    lat: Joi.number().required(),
    lng: Joi.number().required(),
  }).required(),
});
