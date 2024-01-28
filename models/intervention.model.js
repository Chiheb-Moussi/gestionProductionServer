module.exports = (sequelize, Sequelize) => {
    const Intervention = sequelize.define("intervention ", {
        detail_intervention: {
            type: Sequelize.STRING
        },
        date_debut: {
            type: Sequelize.DATE
        },
        date_fin: {
            type: Sequelize.DATE
        },
        is_open: {
            type: Sequelize.BOOLEAN
        }
    }, {
        tableName: 'intervention ',
        timestamps: false
    });

    return Intervention;
};