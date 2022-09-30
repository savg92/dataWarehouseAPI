const { ContactChannel, Contact, Channel } = require('../models');

const createContactChannel = async (req, res) => {
  try {
    const { account, channelId, contactId, preference } = req.body;
    const contactChannel = await ContactChannel.create({ account, channelId, contactId, preference });
    res.status(201).json({
      error: false,
      code: 201,
      message: 'Canal de contacto creado',
      answer: contactChannel
    });
  }
  catch (err) {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'Error al crear canal de contacto',
      answer: err
    });
  }
}

const getAllContactChannels = async (req, res) => {
  try {
    const contactChannels = await ContactChannel.findAll({ include: [
      { model: Contact }
      , 
      { model: Channel }
    ] });
    res.status(200).json({
      error: false,
      code: 200,
      message: 'Listado de canales de contacto',
      answer: contactChannels
    });
  }
  catch (err) {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'Error al listar canales de contacto',
      answer: err
    });
  }
}

const getContactChannelById = async (req, res) => {
  try {
    const { id } = req.params;
    const contactChannel = await ContactChannel.findOne({ where: { id } }, { include: [
      { model: Contact }, { model: Channel }] });
    res.status(200).json({
      error: false,
      code: 200,
      message: 'Canal de contacto obtenido',
      answer: contactChannel
    });
  }
  catch (err) {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'Error al obtener canal de contacto',
      answer: err
    });
  }
}

const updateContactChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const { account, channelsId, contactsId, preference } = req.body;
    const contactChannel = await ContactChannel.update({ account, channelsId, contactsId, preference }, { where: { id } });
    res.status(201).json({
      error: false,
      code: 201,
      message: 'Canal de contacto modificado',
      answer: contactChannel
    });
  }
  catch (err) {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'Error al modificar canal de contacto',
      answer: err
    });
  }
}

const deleteContactChannel = async (req, res) => {
  if(req.auth.data.type === 'Admin') {
    try {
      const { id } = req.params;
      const contactChannel = await ContactChannel.destroy({ where: { id } });
      res.status(200).json({
        error: false,
        code: 200,
        message: 'Canal de contacto eliminado',
        answer: contactChannel
      });
    }
    catch (err) {
      res.status(400).json({
        error: true,
        code: 400,
        message: 'Error al eliminar canal de contacto',
        answer: err
      });
    }
  } else if(req.auth.data.type === 'User') {
    res.status(401).json({
      error: true,
      code: 401,
      message: 'No autorizado para eliminar canal de contacto'
    });
  }
}

module.exports = { createContactChannel, getAllContactChannels, getContactChannelById, updateContactChannel, deleteContactChannel };