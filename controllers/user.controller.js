const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const UserRole = db.userRole;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.createUser = (req, res) => {
    User.create({
        username: req.body.username,
        role_id: req.body.role.id,
        nom: req.body.nom,
        prenom: req.body.prenom,
        active: req.body.active,
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
            username: req.body.username
        },
        include: db.userRole
    })
        .then(user => {
            console.log({user})
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
                    username: user.username,
                    role: user.user_role,
                    nom: user.nom,
                    prenom: user.prenom,
                    active: user.active,
                    accessToken: token,
                    isAdmin: ['Admin', 'Super admin'].includes(user.user_role.role)
                }});
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getUsers = async (req, res) => {
    const users = await User.findAll({include: db.userRole});
    res.send({users})
}

exports.getUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.send({user})
}

exports.updateUser = (req, res) => {
    User.update({
        username: req.body.username,
        role_id: req.body.role.id,
        nom: req.body.nom,
        prenom: req.body.prenom,
        active: req.body.active,
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

exports.getUserRoles = async (req, res) => {
    const roles = await UserRole.findAll();
    res.send({roles})
}