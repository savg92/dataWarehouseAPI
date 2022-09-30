const { Channel } = require('../models');

const createChannel = async (req, res) => {
  try {
    const { name } = req.body;
    const channel = await Channel.create({ name });
    res.status(201).json({
      error: false,
      code: 201,
      message: 'Canal creado',
      answer: channel
    });
  }
  catch (err) {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'Error al crear canal',
      answer: err
    });
  }
}

const getAllChannels = async (req, res) => {
  try {
    const channels = await Channel.findAll();
    res.status(200).json({
      error: false,
      code: 200,
      message: 'Listado de canales',
      answer: channels
    });
  }
  catch (err) {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'Error al listar canales',
      answer: err
    }
    );
  }
}

const getChannelById = async (req, res) => {
  try {
    const { id } = req.params;
    const channel = await Channel.findOne({
      where: {id}
    });
    res.status(200).json({
      error: false,
      code: 200,
      message: 'Canal encontrado',
      answer: channel
    });
  }
  catch (err) {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'Error al encontrar canal',
      answer: err
    }
    );
  }
}

const updateChannel = async (req, res) => {
  if(req.auth.data.type === 'Admin'){
    try {
      const { id } = req.params;
      const { name } = req.body;
      const channel = await Channel.update({ name }, {where: { id }});
      res.status(201).json({
        error: false,
        code: 201,
        message: 'Canal modificado',
        answer: channel
      });
    }
    catch (err) {
      res.status(400).json({
        error: true,
        code: 400,
        message: 'Error al modificar canal',
        answer: err
      }
      );
    }
  } else if (req.auth.data.type === 'User') {
    res.status(401).json({
      error: true,
      code: 401,
      message: 'No autorizado para actualizar canal'
    });
  }
}

const deleteChannel = async (req, res) => {
  if(req.auth.data.type === 'Admin'){
    try {
      const { id } = req.params;
      const channel = await Channel.destroy({where: {id}});
      res.status(200).json({
        error: false,
        code: 200,
        message: 'Canal eliminado',
        answer: channel
      });
    }
    catch (err) {
      res.status(400).json({
        error: true,
        code: 400,
        message: 'Error al eliminar canal',
        answer: err
      }
      );
    }
  } else if (req.auth.data.type === 'User') {
    res.status(401)
    .json({
      error: true,
      code: 401,
      message: 'No autorizado para eliminar canal'
    });
  }
}

module.exports = { createChannel, getAllChannels, getChannelById, updateChannel, deleteChannel };