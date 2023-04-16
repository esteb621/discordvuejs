const db = require("../models");
const Messages = db.Messages;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.text || !req.body.channel_id || !req.body.user_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const messages = {
    text: req.body.text,
    channel_id: req.body.channel_id,
    user_id: req.body.user_id,
    published: req.body.published ? req.body.published : false
  };

  Messages.create(messages)
    .then(data => {
      res.send(data);
      return;
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Message."
      });
      return;
    });
    return;
};

exports.findAll = (req, res) => {
  const id = Messages.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Messages.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Messages."
      });
    });

};

exports.getMessagesByChannelId = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const messages = await Messages.findAll({
      where: { channel_id: id }
    });

    res.json(messages);
  } catch (error) {
    res.status(500).send("Aucun message dans ce channel");
  }
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Messages.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Message with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Message with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  req.body.id = id;

  Messages.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Messages was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Messages with id=${id}. Maybe Messages was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Message with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Messages.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Message was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Message with id=${id}. Maybe Message was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Message with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Messages.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Messages were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all messages."
      });
    });
};

exports.findAllPublished = (req, res) => {
    Messages.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages."
      });
    });
};
