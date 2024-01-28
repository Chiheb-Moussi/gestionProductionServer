
module.exports = (sequelize, Sequelize) => {
    const Family = sequelize.define("family", {
        name_family: {
            type: Sequelize.STRING
        }
    }, {
        tableName: 'family',
        timestamps: false
    });
    return Family;
};