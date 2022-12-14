const express = require("express");
const router = express.Router();

const { Course, User } = require("../models");
const { authenticateUser } = require("../middleware/auth-user");

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const courses = await Course.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "estimatedTime",
        "materialsNeeded",
        "userId",
        
      ],
      include: [
        {
          model: User,
          as:"User",
          attributes: ["id", "firstName", "lastName", "emailAddress"],
        },
      ],
    });
    res.json(courses);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.id, {
      attributes: [
        "id",
        "title",
        "description",
        "estimatedTime",
        "materialsNeeded",
        "userId",
      ],
      include: [
        {
          model: User,
          as:"User",
          attributes: ["id", "firstName", "lastName", "emailAddress"],
        },
      ],
    });
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: "Course Not Found" });
    }
  })
);
// Creates a new course
// Route that creates a new course.
router.post(
  "/",
  authenticateUser,
  asyncHandler(async (req, res) => {
    try {
      const course = await Course.create(req.body);
      res.setHeader("Location", "/courses/" + course.id);
      res.status(201).json().end();
    } catch (error) {
      console.log("ERROR: ", error.name);

      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);
//Update the corresponding course and returns a 204 HTTP status code
router.put(
  "/:id",
  authenticateUser,
  asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      const user = req.currentUser;
      if (user.id === course.userId) {
        try {
          await course.update(req.body);
          res.status(204).end();
        } catch (error) {
          if (error.name === "SequelizeValidationError") {
            const errors = error.errors.map((err) => err.message);
            res.status(400).json(errors);
          } else {
            next(error);
          }
        }
      } else {
        res.status(403).json({ message: "Access denied. " });
      }
    } else {
      res.status(404).json({ message: "Course Not Found." });
    }
  })
);

//Deletes the corresponding course and returns a 204 HTTP status code
router.delete(
  "/:id",
  authenticateUser,
  asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      const user = req.currentUser;
      if (user.id === course.userId) {
        await course.destroy();
        res.status(204).end();
      } else {
        res.status(403).json({ message: "User ID does not match" });
      }
    } else {
      res
        .status(404)
        .json({ message: "The course you are trying to delete was not found" });
    }
  })
);

module.exports = router;
