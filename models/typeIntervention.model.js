
module.exports = (sequelize, Sequelize) => {
    const TypeIntervention = sequelize.define("type_intervention", {
        name_discontinue: {
            type: Sequelize.STRING
        }
    }, {
        tableName: 'type_intervention',
        timestamps: false
    });
    return TypeIntervention;
};