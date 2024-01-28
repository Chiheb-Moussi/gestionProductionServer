module.exports = (sequelize, Sequelize) => {
    const SubFamily = sequelize.define("sub_family", {
        name_sub_family: {
            type: Sequelize.STRING
        }
    }, {
        tableName: 'sub_family',
        timestamps: false
    });

    return SubFamily;
};