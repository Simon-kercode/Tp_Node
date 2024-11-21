class Crud {
    constructor(data = {}) {
        Object.assign(this, data);
    }

    static async loadAll(service, ModelClass) {
        if (!service) {
            throw new Error("Service is not initialized");
        }
        const data = await service.getAll();
        return data.map(element => new ModelClass(element));
    }
}
module.exports = Crud








