const { v4 } = require('uuid');

const db = require('../../database');

// eslint-disable-next-line prefer-const
let contacts = [
  {
    id: v4(),
    name: 'Sammy',
    email: 'sammy@gmail.com',
    phone: '123321123321',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Joao',
    email: 'joao@gmail.com',
    phone: '43211234321',
    category_id: v4(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }

  findById(id) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.id === id),
    ));
  }

  findByEmail(email) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.email === email),
    ));
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  async create({
    name, email, phone, categoryId,
  }) {
    const [row] = await db.query(`INSERT INTO contacts(name, email, phone, category_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [name, email, phone, categoryId]);

    return row;
  }

  update(id, {
    name, email, phone, categoryId,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        categoryId,
      };

      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));

      resolve(updatedContact);
    });
  }
}
module.exports = new ContactsRepository();
