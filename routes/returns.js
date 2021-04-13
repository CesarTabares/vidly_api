const express = require("express");
const router = express.Router();
const { Rental } = require("../models/rentals");
const { Movie } = require("../models/movies");
const auth = require("../middleware/auth");
const moment = require("moment");
const Joi = require("joi");
const validate = require("../middleware/validate");

const validateReturn = (request) => {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });
  return schema.validate(request);
};

router.post("/", [auth, validate(validateReturn)], async (req, res) => {
  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

  if (!rental) {
    return res.status(404).send("Rental not found");
  }

  if (rental.dateReturned)
    return res.status(400).send("Return Already processed");

  rental.return();

  await rental.save();
  await Movie.updateOne(
    { _id: rental.movie._id },
    {
      $inc: { numberInStock: 1 },
    }
  );

  return res.send(rental);
});

module.exports = router;
