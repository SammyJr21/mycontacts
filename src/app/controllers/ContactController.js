class ContactController {
  index(request, response) {
    response.send('Send from Contact Controllerd');
  }

  show() {

  }

  store() {

  }

  update() {

  }

  delete() {

  }
}

// Singleton
module.exports = new ContactController();
