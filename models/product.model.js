module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("produit", {
        objective_fpy: {
            type: Sequelize.FLOAT
        },
        objective_trg: {
            type: Sequelize.FLOAT
        },
        name_prog: {
            type: Sequelize.STRING
        },
        item_code: {
            type: Sequelize.STRING
        },
        face: {
            type: Sequelize.BOOLEAN
        },
        cadence: {
            type: Sequelize.INTEGER
        }
    }, {
        tableName: 'produit',
        timestamps: false
    });

    return Product;
};