const db = require("../models");
const Intervention = db.intervention;
const TypeIntervention = db.typeIntervention;
const Line =  db.line;

const Op = db.Sequelize.Op;


exports.createIntervention = (req, res) => {
    Intervention.create({
        id_type_intervention: req.body.type_intervention.id,
        detail_intervention: req.body.detail_intervention,
        date_debut: req.body.date_debut,
        date_fin: req.body.date_fin,
        is_open: req.body.is_open,
        id_line: req.body.line.id
    })
        .then(user => {
            res.send({ message: "Intervention was added successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};



exports.getInterventions = async (req, res) => {
    const interventions = await Intervention.findAll({include: [db.typeIntervention, db.line]});
    res.send({interventions})
}

exports.getIntervention = async (req, res) => {
    const intervention = await Intervention.findByPk(req.params.id, {include: [db.typeIntervention, db.line]});
    res.send({intervention})
}

exports.updateIntervention = (req, res) => {
    Intervention.update({
        id_type_intervention: req.body.type_intervention.id,
        detail_intervention: req.body.detail_intervention,
        date_debut: req.body.date_debut,
        date_fin: req.body.date_fin,
        is_open: req.body.is_open,
        id_line: req.body.line.id
    }, {
        where: { id: req.params.id}
    })
        .then(user => {
            res.send({ message: "intervention was updated successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getInterventionRelations = async (req, res) => {
    const lines = await Line.findAll();
    const type_interventions = await TypeIntervention.findAll();
    res.send({
        lines,
        type_interventions
    })
}