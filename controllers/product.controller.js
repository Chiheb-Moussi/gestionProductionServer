const db = require("../models");
const Product = db.product;
const Family = db.family;
const SubFamily = db.subFamily;
const Line =  db.line;

const Op = db.Sequelize.Op;


exports.createProduct = (req, res) => {
    console.log(req.body)
    Product.create({
        objective_fpy: req.body.objective_fpy,
        objective_trg: req.body.objective_trg,
        name_prog: req.body.name_prog,
        item_code: req.body.item_code,
        face: req.body.face,
        cadence: req.body.cadence,
        id_sub_family: req.body.sub_family.id,
        id_family: req.body.family.id,
        id_line: req.body.line.id
    })
        .then(user => {
            res.send({ message: "Product was added successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};



exports.getProducts = async (req, res) => {
    const products = await Product.findAll({include: [db.subFamily, db.line, db.family]});
    res.send({products})
}

exports.getProduct = async (req, res) => {
    const product = await Product.findByPk(req.params.id, {include: [db.subFamily, db.line, db.family]});
    res.send({product})
}

exports.updateProduct = (req, res) => {
    Product.update({
        objective_fpy: req.body.objective_fpy,
        objective_trg: req.body.objective_trg,
        name_prog: req.body.name_prog,
        item_code: req.body.item_code,
        face: req.body.face,
        cadence: req.body.cadence,
        id_sub_family: req.body.sub_family.id,
        id_family: req.body.family.id,
        id_line: req.body.line.id
    }, {
        where: { id: req.params.id}
    })
        .then(user => {
            res.send({ message: "product was updated successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getProductRelations = async (req, res) => {
    const families = await Family.findAll();
    const subFamilies = await SubFamily.findAll();
    const lines = await Line.findAll();
    res.send({
        families,
        subFamilies,
        lines
    })
}