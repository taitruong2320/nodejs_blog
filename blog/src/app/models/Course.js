const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CourseSchema = new Schema({

    _id: {type: Number},
    name: { type: String, required: true},
    description: { type: String },
    image: { type: String },
    slug: { type: String, slug: 'name', unique: true },
    videoId: { type:String, required: true},
    level: { type:String },
    
},{
    _id: false,
    timestamps: true,
});

CourseSchema.query.sortTable = function (req) {
    if(req.query.hasOwnProperty('_sort')){
        const isValidType = ['asc','desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
}
 
CourseSchema.plugin(AutoIncrement);

CourseSchema.plugin(mongooseDelete, { 
    overrideMethods: 'all' ,
    deletedAt : true,
});
mongoose.plugin(slug);

module.exports = mongoose.model('Course', CourseSchema);
