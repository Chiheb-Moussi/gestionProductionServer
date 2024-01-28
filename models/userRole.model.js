
module.exports = (sequelize, Sequelize) => {
    const UserRole = sequelize.define("user_role", {
        role: {
            type: Sequelize.STRING
        }
    }, {
        tableName: 'user_role',
        timestamps: false
    });

    return UserRole;
};