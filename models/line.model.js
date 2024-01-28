
module.exports = (sequelize, Sequelize) => {
    const Line = sequelize.define("line", {
        name_line: {
            type: Sequelize.STRING
        }
    }, {
        tableName: 'line',
        timestamps: false
    });

    return Line;
};