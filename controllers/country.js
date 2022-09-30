const { Country, Region, City } = require('../models');

const createCountry = async (req, res) => {
  try {
    const { name, regionId } = req.body;
    const country = await Country.create({ name, regionId });
    res.status(201).json({
      error: false,
      code: 201,
      message: 'Pais creado',
      answer: country
    });
  }
  catch (err) {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'Error al crear pais',
      answer: err
    });
  }
}

const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.findAll(
      {include: [City, Region], attributes: {exclude: ['regionId']}}
    );
    res.status(200).json({
      error: false,
      code: 200,
      message: 'Listado de paises',
      answer: countries
    });
  }
  catch (err) {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'Error al listar paises',
      answer: err
    }
    );
  }
}

const getCountryById = async (req, res) => {
  try {
    const country = await Country.findOne(
      {where: {id: req.params.id},
      include: [City, Region], attributes: {exclude: ['regionId']}}
      );
    res.status(200).json({
      error: false,
      code: 200,
      message: 'Pais encontrado',
      answer: country
    });
  }
  catch (err) {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'Error al obtener pais',
      answer: err
    });
  }
}

const updateCountry = async (req, res) => {
  if(req.auth.data.type === 'Admin') {
    try {
      const country = await Country.update({
        name: req.body.name,
        regionId: req.body.regionId
      }, {
        where: {
          id: req.params.id
        }
      });
      res.status(201).json({
        error: false,
        code: 201,
        message: 'Pais modificado',
        answer: country
      });
    }
    catch (err) {
      res.status(400).json({
        error: true,
        code: 400,
        message: 'Error al modificar pais',
        answer: err
      });
    }
  } else if(req.auth.data.type === 'User') {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'No autorizado para modificar pais'
    });
  }
}

const deleteCountry = async (req, res) => {
  if(req.auth.data.type === 'Admin') {
    try {
      const country = await Country.destroy({
        where: {
          id: req.params.id
        }
      });
      res.status(200).json({
        error: false,
        code: 200,
        message: 'Pais eliminado',
        answer: country
      });
    }
    catch (err) {
      res.status(400).json({
        error: true,
        code: 400,
        message: 'Error al eliminar pais',
        answer: err
      });
    }
  } else if(req.auth.data.type === 'User') {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'No autorizado para eliminar pais'
    });
  }
}

module.exports = { createCountry, getAllCountries, getCountryById, updateCountry, deleteCountry };