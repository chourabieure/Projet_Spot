const express = require("express");
const User = require("../models/user.model.js");
const router = express.Router()

// Create user
router.post("/user", async (req, res) => {
    const user = new User({
        "ip_adress": req.body.ip_adress,
    })
    await user.save()
    res.send(user)
})

// Get all user
router.get("/user", async (req, res) => {
    const user = await User.find()
    res.send(user)
})

// Get individual user
router.get("/user/:ip_adress", async (req, res) => {
    try {
        const user = await User.findOne({ ip_adress: req.params.ip_adress })
        if (!user) {
            res.status(404)
            res.send({ error: "This User doesn't exist!" })
        } else {
            res.send(user)
        }
    } catch {
        res.status(500)
        res.send({ error: "Something went Wrong while retrieving single User" })
    }
})

// // Updating an user by id
// router.patch("/user/:id", async (req, res) => {
//     try {
//         const user = await User.findOne({ ip_adress: req.params.id })
//         if (!user) {
//             res.status(404)
//             res.send({ error: "This User doesn't exist!" })
//         } else {
//             if (req.body.geo_x) {
//                 user.geo_x = req.body.geo_x
//             }
//             if (req.body.geo_y) {
//                 user.geo_y = req.body.geo_y
//             }
//             if (req.body.nombre) {
//                 user.nombre = req.body.nombre
//             }
//             await user.save()
//             res.send(user)
//         }

//     } catch (error) {
//         res.status(500)
//         res.send({ error: "Something went Wrong while updating an User" })
//     }
// })

// Deleting an user by its id
router.delete("/user/:ip_adress", async (req, res) => {
    try {
        await User.deleteOne({ ip_adress: req.params.ip_adress })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "User doesn't exist!" })
    }
})

module.exports = router