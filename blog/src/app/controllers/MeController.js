const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {

    storedCourses(req, res,next) {

        Promise.all([ Course.find({}).sortTable(req), Course.countDocumentsDeleted({})])
            .then(([courses, deletedCount]) => 
                res.render('me/stored-courses', { 
                    courses: mutipleMongooseToObject(courses),
                    deletedCount,
                })
            )
            .catch(next);
        // Course.countDocumentsDeleted({})
        //     .then((deletedCount) => {
        //     })
        //     .catch(next);
        // Course.find({})
        //     .then(courses => res.render('me/stored-courses', { courses: mutipleMongooseToObject(courses) }))
        //     .catch(next);
    }
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => res.render('me/trash-courses', { courses: mutipleMongooseToObject(courses) }))
            .catch(next);
    }
}
module.exports = new MeController();
