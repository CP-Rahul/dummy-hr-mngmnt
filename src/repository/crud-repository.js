class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        return await this.model.create(data);
    }

    async get(id) {
        return await this.model.findById(id);
    }

    async getAll(filter = {}) {
        return await this.model.find(filter);
    }

    async update(id, data) {
        return await this.model.findByIdAndUpdate(id, data);
    }

    async destroy(id, data) {
        return await this.model.findByIdAndDelete(id);
    }
}

export default CrudRepository;