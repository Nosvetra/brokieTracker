class baseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const document = new this.model(data);
    return await document.save();
  }

  async findById(data) {
    const user = this.model.find({ email: data.email });
    return user;
  }
}

export default baseRepository;
