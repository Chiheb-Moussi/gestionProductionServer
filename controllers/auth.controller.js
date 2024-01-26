const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Enregistrer l'utilisateur à la bd

    User.create({
        name_user: req.body.username,
        role: req.body.role,
        nom: req.body.nom,
        prenom: req.body.prenom,
        active: req.body.status,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            res.send({ message: "User was registered successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            name_user: req.body.username
        }
    })
        .then(user => {
            console.log(user)
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            // if (!passwordIsValid) {
            //     return res.status(401).send({
            //         accessToken: null,
            //         message: "Invalid Password!"
            //     });
            // }

            const token = jwt.sign({ id: user.id },
                config.secret,
                {
                    algorithm: 'HS256',
                    allowInsecureKeySizes: true,
                    expiresIn: 86400, // 24 hours
                });


            res.status(200).send({user:{
                    id: user.id,
                    username: user.name_user,
                    role: user.role,
                    nom: user.nom,
                    prenom: user.prenom,
                    status: user.active,
                    accessToken: token
                }});
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getUsers = async (req, res) => {
    const users = await User.findAll();
    res.send({users})
}

exports.getUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.send({user})
}

exports.updateUser = (req, res) => {
    // Modifier l'utilisateur à la bd

    User.update({
        name_user: req.body.username,
        role: req.body.role,
        nom: req.body.nom,
        prenom: req.body.prenom,
        active: req.body.status,
        password: bcrypt.hashSync(req.body.password, 8)
    }, {
        where: { id: req.params.id}
    })
        .then(user => {
            res.send({ message: "User was updated successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};