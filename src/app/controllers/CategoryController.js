const CategoriesReposity = require('../repositories/CategoryRepository')

class CategoryController {
 async index (request, response) {
  const categories = await CategoriesReposity.findAll();

  response.json(categories);
}
  async store (request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoriesReposity.create({ name });

    response.json(category);
  }
}

module.exports = new CategoryController();
