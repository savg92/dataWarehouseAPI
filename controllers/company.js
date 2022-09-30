const { Company, City, Country, Region } = require('../models');

const createCompany = async (req, res) => {
  try {
    const { name, address, email, phone, cityId } = req.body;
    const company = await Company.create({ name, address, email, phone, cityId });
    res.status(201).json({
      error: false,
      code: 201,
      message: 'Compañia creada',
      answer: company
    });
  }
  catch (err) {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'Error al crear compañia',
      answer: err
    });
  }
}

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll(
      {
        include: [{model: City, include: [{model: Country, include: [{model: Region}], attributes: {exclude: ['regionId']}}],attributes: {exclude: ['countryId']}}], attributes: {exclude: ['cityId']}
      }
    );
    res.status(200).json({
      error: false,
      code: 200,
      message: 'Listado de compañias',
      answer: companies
    });
  }
  catch (err) {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'Error al listar compañias',
      answer: err
    }
    );
  }
}

const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findOne({
      where: {id},
      include: [{model: City, include: [{model: Country, include: [{model: Region}], attributes: {exclude: ['regionId']}}],attributes: {exclude: ['countryId']}}], attributes: {exclude: ['cityId']}
    });
    res.status(200).json({
      error: false,
      code: 200,
      message: 'Compañia encontrada',
      answer: company
    });
  }
  catch (err) {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'Error al encontrar compañia',
      answer: err
    });
  }
}

const updateCompany = async (req, res) => {
  try {
    const { name, address, email, phone, cityId } = req.body;
    const company = await Company.update({ name, address, email, phone, cityId }, {where: {id: req.params.id}});
    res.status(201).json({
      error: false,
      code: 201,
      message: 'Compañia actualizada',
      answer: company
    });
  }
  catch (err) {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'Error al actualizar compañia',
      answer: err
    });
  }
}

const deleteCompany = async (req, res) => {
  if(req.auth.data.type === 'Admin') {
    try {
      const company = await Company.destroy({where: {id: req.params.id}});
      res.status(200).json({
        error: false,
        code: 200,
        message: 'Compañia eliminada',
        answer: company
      });
    }
    catch (err) {
      res.status(400).json({
        error: true,
        code: 400,
        message: 'Error al eliminar compañia',
        answer: err
      });
    }
  } else if(req.auth.data.type === 'User') {
    res.status(401).json({
      error: true,
      code: 401,
      message: 'No autorizado para eliminar compañia'
    });
  }
}

module.exports = { createCompany, getAllCompanies, getCompanyById, updateCompany, deleteCompany };