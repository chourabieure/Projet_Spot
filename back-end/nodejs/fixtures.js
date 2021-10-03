const connectDB = require('./models/db.js');
const cleaned_arceau = require('./data/cleaned_arceaux.json')
const Arceau = require("./models/arceau.model.js");

// Connecting before populating the cluster
connectDB()

cleaned_arceau.forEach(elem => {
    new Arceau({
        "index": elem._id,
        "geo_x": elem.geo_x,
        "geo_y": elem.geo_y,
        "nombre": elem.nombre
    }).save()
})







