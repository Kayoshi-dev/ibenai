"use strict";

const util = require("util");
const path = require("path");
const { pipeline } = require("stream");
const pump = util.promisify(pipeline);
const fs = require("fs");
//import NewEventSchema from "../../../../utils/schemas/NewEventSchema";

module.exports = async function (fastify, opts) {
  fastify.post(
    "/",
    /*    {
      schema: { body: NewEventSchema },
      validatorCompiler: ({ schema, method, url, httpPart }) => {
        return (data) => schema.validate(data);
      },
    },*/
    async function (request, reply) {
      const picture = await request.body.coverPicture;

      const newPictureName = `${
        path.parse(picture.filename).name
      }-${Date.now()}-${Math.round(Math.random() * 1e9)}${
        path.parse(picture.filename).ext
      }`;

      await pump(
        picture.toBuffer(),
        fs.createWriteStream(`./public/event/${newPictureName}`)
      );

      return await fastify.prisma.event.create({
        data: {
          title: request.body.title.value,
          description: request.body.title.value,
          coverPicture: newPictureName,
          startDate: new Date(request.body.startDate.value),
          startTime:
            `${new Date(request.body.startTime.value).getHours()}h${new Date(
              request.body.startTime.value
            ).getMinutes()}` || null,
          endDate: new Date(request.body.endDate.value),
          endTime:
            `${new Date(request.body.endTime.value).getHours()}h${new Date(
              request.body.endTime.value
            ).getMinutes()}` || null,
          location: request.body.location.value,
          position: request.body.position.value,
        },
      });
    }
  );
};
