/* eslint-disable no-unused-vars */
const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts);
  }

  async show(request, response) {
    // eslint-disable-next-line no-unused-vars
    const { id } = request.params;

    const contact = await ContactsRepository.findById();

    if (!contact) {
      // 404: Not Found
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(contact);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactExists = await ContactsRepository.findByEmail(email);
    if (contactExists) {
      return response.status(400).json({ error: 'This e-mail is already taken ' });
    }

    const contacts = await ContactsRepository.create({
      name, email, phone, category_id
    });

    response.json(contacts);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await ContactsRepository.findById(id);
    if (!contactExists) {
      return response.status(404).json({ error: 'User not found' });
    }
    const contactByEmail = await ContactsRepository.findByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: 'This e-mail is already taken ' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contact = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    await ContactsRepository.delete(id);
    // 204: No Content
    response.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
