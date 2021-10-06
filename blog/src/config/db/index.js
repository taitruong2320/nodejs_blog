const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/taitruong_dev',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // userCreateIndex: true,
        });
        console.log('connection thanh cong');
    } catch (err) {
        console.log('error connecting');
    }
}
module.exports = { connect };
