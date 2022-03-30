const { uuid } = require('uuidv4');

const contacts = [
  {
    id: uuid(),
    name: 'Sammy',
    email: 'sammy@gmail.com',
    phone: '123321123321',
    category_id: uuid(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }
}

module.exports = new ContactsRepository();
