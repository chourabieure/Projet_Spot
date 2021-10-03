const express = require("express");
const Arceau = require("../models/arceau.model.js");
const router = express.Router()

// Create arceau
router.post("/arceau", async (req, res) => {
    const arceau = new Arceau({
        "index": req.body.index,
        "geo_x": req.body.geo_x,
        "geo_y": req.body.geo_y,
        "nombre": req.body.nombre
    })
    await arceau.save()
    res.send(arceau)
})

// Get all arceau
router.get("/arceau", async (req, res) => {
    const arceau = await Arceau.find()
    res.send(arceau)
})

// Get individual arceau
router.get("/arceau/:id", async (req, res) => {
    try {
        const arceau = await Arceau.findOne({ index: req.params.id })
        if (!arceau) {
            res.status(404)
            res.send({ error: "This Arceau doesn't exist!" })
        } else {
            res.send(arceau)
        }
    } catch {
        res.status(500)
        res.send({ error: "Something went Wrong while retrieving single Arceau" })
    }
})

// Updating an arceau by id
router.patch("/arceau/:id", async (req, res) => {
    try {
        const arceau = await Arceau.findOne({ index: req.params.id })
        if (!arceau) {
            res.status(404)
            res.send({ error: "This Arceau doesn't exist!" })
        } else {
            if (req.body.geo_x) {
                arceau.geo_x = req.body.geo_x
            }
            if (req.body.geo_y) {
                arceau.geo_y = req.body.geo_y
            }
            if (req.body.nombre) {
                arceau.nombre = req.body.nombre
            }
            await arceau.save()
            res.send(arceau)
        }

    } catch (error) {
        res.status(500)
        res.send({ error: "Something went Wrong while updating an Arceau" })
    }
})

// Deleting an arceau by its id
router.delete("/arceau/:id", async (req, res) => {
    try {
        await Arceau.deleteOne({ index: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Arceau doesn't exist!" })
    }
})

module.exports = router