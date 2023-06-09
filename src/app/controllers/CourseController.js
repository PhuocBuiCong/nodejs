const Course = require("../models/Course");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");
class CourseController {
  // GET /course/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("courses/show", { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  // GET /course/create
  create(req, res, next) {
    res.render("courses/create");
  }

  // POST /course/store
  store(req, res, next) {
    const image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
    const formData = { ...req.body, image };
    const course = new Course(formData);
    course
      .save()
      .then(() => res.redirect("/me/stored/courses"))
      .catch((err) => {
        //catch error
      });
  }

  // GET /course/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) => {
        res.render("courses/edit", { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  // PUT /courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }

  // DELETE /courses/:id
  delete(req, res, next) {
    Course.delete({ _id: req.params.id }) //use delete in moongose-delete
      .then(() => res.redirect("back"))
      .catch(next);
  }
  // DELETE /courses/:id.force
  forceDelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // PATCH /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id }) //use restore in moongose-delete
      .then(() => {
        res.redirect("back");
      })
      .catch(next);
  }
}

module.exports = new CourseController();
