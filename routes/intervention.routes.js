const controller = require("../controllers/intervention.controller");

module.exports = function(app) {
    app.post(
        "/api/interventions",
        controller.createIntervention
    );
    app.get("/api/interventions", controller.getInterventions)
    app.get("/api/interventions/:id", controller.getIntervention)
    app.post("/api/interventions/:id", controller.updateIntervention)
    app.get("/api/interventionRelations", controller.getInterventionRelations)

};