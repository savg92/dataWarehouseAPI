const { City, Country, Region } = require('../models');

const createCity = async (req, res) => {
  try {
    const { name, countryId } = req.body;
    const city = await City.create({name, countryId});
    res.status(201).json({
      error: false,
      code: 201,
      message: 'Ciudad creada',
      answer: city
    });
  }
  catch (err) {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'Error al crear ciudad',
      answer: err
    });
  }
}

const getAllCities = async (req, res) => {
  try {
    const cities = await City.findAll(
      {include: [{model: Country, include: [{model: Region}], attributes: {exclude: ['regionId']}}], attributes: {exclude: ['countryId']}}
    );
    res.status(200).json({
      error: false,
      code: 200,
      message: 'Listado de ciudades',
      answer: cities
    });
  }
  catch (err) {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'Error al listar ciudades',
      answer: err
    }
    );
  }
}

const getCityById = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await City.findOne(
      {where: {id},
      include: [{model: Country, include: [{model: Region}], attributes: {exclude: ['regionId']}}], attributes: {exclude: ['countryId']}
    });
    res.status(200).json({
      error: false,
      code: 200,
      message: 'Ciudad encontrada',
      answer: city
    });
  }
  catch (err) {
    res.status(400).json({
      error: true,
      code: 400,
      message: 'Error al listar ciudad',
      answer: err
    }
    );
  }
}

const updateCity = async (req, res) => {
  if(req.auth.data.type === 'Admin'){
    try {
      const city = await City.update(
      {
        name: req.body.name,
        countryId: req.body.countryId
      }, 
      {where: {id: req.params.id}});
      res.status(201).json({
        error: false,
        code: 201,
        message: 'Ciudad actualizada',
        answer: city
      });
    }
    catch (err) {
      res.status(400).json({
        error: true,
        code: 400,
        message: 'Error al actualizar ciudad',
        answer: err
      });
    }
  } else if(req.auth.data.type === 'User'){
    res.status(401).json({
      error: true,
      code: 401,
      message: 'No autorizado para actualizar ciudad',
    });
  }
}

const deleteCity = async (req, res) => {
  if(req.auth.data.type === 'Admin'){
    try {
      const city = await City.destroy({where: {id: req.params.id}});
      res.status(200).json({
        error: false,
        code: 200,
        message: 'Ciudad eliminada',
        answer: city
      });
    }
    catch (err) {
      res.status(400).json({
        error: true,
        code: 400,
        message: 'Error al eliminar ciudad',
        answer: err
      });
    }
  } else if(req.auth.data.type === 'User'){
    res.status(401).json({
      error: true,
      code: 401,
      message: 'No autorizado para eliminar ciudad'
    });
  }
}

module.exports = { createCity, getAllCities, getCityById, updateCity, deleteCity };