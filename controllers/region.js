const { Region, Country, City } = require('../models');

const createRegion = async (req, res) => {
  try {
    const region = await Region.create({
      name: req.body.name
    });
    res.status(201).json({
      error: false,
      code: 201,
      message: 'Region creada',
      answer: region
    });
  }
  catch (err) {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'Error al crear region',
      answer: err
    });
  }
}

const getAllRegions = async (req, res) => {
  try {
      const regions = await Region.findAll(
        {include: [{model: Country, include: [{model: City}], attributes: {exclude: ['cityId']}}], attributes: {exclude: ['countryId']}}
      );
      res.status(200).json({
          error: false,
          code: 200,
          message: 'Listado de regiones',
          answer: regions
      });
  }
  catch (err) {
      res.status(400).json({
          error: true,
          code: 400,
          message: 'Error al listar regiones',
          answer: err
      }
    );
  }
}

const getRegionById = async (req, res) => {
  try {
    const region = await Region.findOne({
      where: {
        id: req.params.id
      },
      include: [{model: Country, include: [{model: City}], attributes: {exclude: ['cityId']}}], attributes: {exclude: ['countryId']}
    });
    res.status(200).json({
      error: false,
      code: 200,
      message: 'Datos de la region',
      answer: region
    });
  }
  catch (err) {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'Error al encontrar region',
      answer: err
    });
  }
}

const updateRegion = async (req, res) => {
  if(req.auth.data.type === 'Admin') {
    try {
      const region = await Region.update({
        name: req.body.name
      }, {
        where: {
          id: req.params.id
        }
      });
      res.status(201).json({
        error: false,
        code: 201,
        message: 'Region actualizada',
        answer: region
      });
    }
    catch (err) {
      res.status(400).json({
        error: true,
        code: 400,
        message: 'Error al modificar region',
        answer: err
      });
    }
  } else if(req.auth.data.type === 'User') {
    res.status(401).json({
      error: true,
      code: 401,
      message: 'No autorizado para modificar region',
    });
  }
}

const deleteRegion = async (req, res) => {
  if(req.auth.data.type === 'Admin') {
    try {
      const region = await Region.destroy({
        where: {
          id: req.params.id
        }
      });
      res.status(200).json({
        error: false,
        code: 200,
        message: 'Region eliminada',
        answer: region
      });
    }
    catch (err) {
      res.status(400).json({
        error: true,
        code: 400,
        message: 'Error al eliminar region',
        answer: err
      });
    }
  } else if(req.auth.data.type === 'User') {
    res.status(401).json({
      error: true,
      code: 401,
      message: 'No autorizado para eliminar region',
    });
  }
}

module.exports = { getAllRegions, getRegionById, createRegion, updateRegion, deleteRegion }