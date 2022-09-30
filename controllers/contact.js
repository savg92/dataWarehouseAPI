const { Contact, City, Country, Region, Company, ContactChannel, Channel } = require('../models');

const createContact = async (req, res) => {
  try {
    const { firstName, lastName, jobTitle, email, companyId, cityId, interest } = req.body;
    const contact = await Contact.create({ firstName, lastName, jobTitle, email, companyId, cityId, interest });
    res.status(201).json({
      error: false,
      code: 201,
      message: 'Contacto creado',
      answer: contact
    });
  }
  catch (err) {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'Error al crear contacto',
      answer: err
    });
  }
}

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll(
      {
        include: [
          {model: Company, include: [{model: City, include: [{model: Country, include: [{model: Region}], attributes: {exclude: ['regionId']}}],attributes: {exclude: ['countryId']}}], attributes: {exclude: ['cityId']}},
          {model: ContactChannel, include: [{model: Channel}], attributes: {exclude: ['contactId']}}
        ], attributes: {exclude: ['companyId', 'cityId']}
      }
      );
    res.status(200).json({
      error: false,
      code: 200,
      message: 'Listado de contactos',
      answer: contacts
    });
  }
  catch (err) {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'Error al listar contactos',
      answer: err
    }
    );
  }
}

const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findOne({
      where: {id},
      include: [
        {model: Company, include: [{model: City, include: [{model: Country, include: [{model: Region}], attributes: {exclude: ['regionId']}}],attributes: {exclude: ['countryId']}}], attributes: {exclude: ['cityId']}},
        {model: ContactChannel, include: [{model: Channel}], attributes: {exclude: ['contactId']}}
    ], attributes: {exclude: ['companyId', 'cityId']} 
    });
    res.status(200).json({
      error: false,
      code: 200,
      message: 'Contacto encontrado',
      answer: contact
    });
  }
  catch (err) {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'Error al encontrar contacto',
      answer: err
    }
    );
  }
}

const updateContact = async (req, res) => {
  try {
    const { firstName, lastName, jobTitle, email, companyId, cityId, interest } = req.body;
    const contact = await Contact.update(
      { firstName, lastName, jobTitle, email, companyId, cityId, interest }, { where: { id: req.params.id } }
    );
    res.status(201).json({
      error: false,
      code: 201,
      message: 'Contacto actualizado',
      answer: contact
    });
  }
  catch (err) {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'Error al actualizar contacto',
      answer: err
    });
  }
}

const deleteContact = async (req, res) => {
  if(req.auth.data.type === 'Admin') {
    try {
      const contact = await Contact.destroy({ where: { id: req.params.id } });
      res.status(200).json({
        error: false,
        code: 200,
        message: 'Contacto eliminado',
        answer: contact
      });
    }
    catch (err) {
      res.status(400).json({
        error: true,
        code: 400,
        message: 'Error al eliminar contacto',
        answer: err
      });
    }
  } else if(req.auth.data.type === 'User') {
    res.status(401).json({
      error: true,
      code: 401,
      message: 'No autorizado para eliminar contacto'
    });
  }
}

module.exports = { createContact, getAllContacts, getContactById, updateContact, deleteContact };