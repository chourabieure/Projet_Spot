// maison : 192.168.1.16 / campus : 10.134.199.149 / mongo atlas key : 4JD8q8Pn94TQxzOo
const cors = require('cors');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());

// ROUTES
const routes_arceau = require("./routes/arceau.routes.js");
const routes_user = require("./routes/user.routes.js");
app.use("/api", routes_arceau)
app.use("/api", routes_user)

// DATABASE
const connectDB = require('./models/db.js');
connectDB()


app.get("/", (req, res) => {
    res.json({
        "routes": {
            "Arceau": [
                {
                    "Route": "/api/arceau",
                    "Method": "POST",
                    "Description": "Create a new Arceau",
                    "Params": "index,geo_x,geo_y,nombre"
                },
                {
                    "Route": "/api/arceau",
                    "Method": "GET",
                    "Description": "Retrieve all Arceau",
                    "Params": "_"
                }, {
                    "Route": "/api/arceau/:id",
                    "Method": "GET",
                    "Description": "Retrieve Arceau by id",
                    "Params": "_"
                },
                {
                    "Route": "/api/arceau/:id",
                    "Method": "PATCH",
                    "Description": "Update Arceau by id",
                    "Params": "index,geo_x,geo_y,nombre"
                }, {
                    "Route": "/api/arceau/:id",
                    "Method": "DELETE",
                    "Description": "Delete Arceau by id",
                    "Params": "_"
                }
            ],
            "User": [
                {
                    "Route": "/api/user",
                    "Method": "POST",
                    "Description": "Create a new User",
                    "Params": "ip_adress"
                },
                {

                    "Route": "/api/user",
                    "Method": "GET",
                    "Description": "Retrieve all User",
                    "Params": "_"
                },
                {
                    "Route": "/api/user/:ip_adress",
                    "Method": "GET",
                    "Description": "Retrieve User by ip_adress",
                    "Params": "_"
                },
                {
                    "Route": "/api/user/:ip_adress",
                    "Method": "DELETE",
                    "Description": "Delete User by ip_adress",
                    "Params": "_"
                }
            ]
        }
    });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
console.log(PORT)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
