const mongoose = require('mongoose');


const homeSchema = new mongoose.Schema({
    title: {type: String, required: true},
    descripcion: {type: String, required: true}
});


const homeModel = mongoose.model('Home', homeSchema);


class Home {

}

module.exports = Home;