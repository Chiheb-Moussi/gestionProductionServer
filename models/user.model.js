module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name_user: {
            type: Sequelize.STRING
        },
        nom: {
            type: Sequelize.STRING
        },
        prenom: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        active: {
            type: Sequelize.BOOLEAN
        },
        role: {
            type: Sequelize.STRING
        }
    }, {
        tableName: 'user',
        timestamps: false
    });

    return User;
};