const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    search(req, res) {
        res.render('search');
    }
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
        // Course.find({}, function (err, courses) {
        //     if(!err){
        //         res.json(courses);
        //     }else{
        //         next(err);
        //     }
        // });
    }
}
module.exports = new SiteController();
