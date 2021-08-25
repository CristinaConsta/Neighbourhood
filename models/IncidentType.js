const mongoose = require("mongoose");
const { Schema } = mongoose;

const IncidentType = new Schema({
type: {
        type: String, required: true,
    },
gravity:{
    type: String,
},
});

module.exports = mongoose.model("IncidentType", IncidentType);
