const bcrypt = require('bcrypt');
const { User } = require('../models');

const createUser = async (req, res) => {
  if(req.auth.data.type === 'Admin') {
    const hash = bcrypt.hashSync(req.body.password, 10);
    try {
      const email = await User.findOne({where: {email: req.body.email}});
      if(email) {
        return res.status(409).json({message: 'Email ya existe o en uso'});
      } else {
        try {
          const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            profile: req.body.profile
          });
          res.status(201).json({
            error: false,
            code: 201,
            message: 'Usuario creado',
            answer: user
          });
        }
        catch (err) {
          res.status(400).json({
            error: true,
            code: 400,
            message: 'Error al crear usuario',
            answer: err
          });
        }
      }
    }
    catch (err) {
      res.status(400).json({
        error: true,
        code: 400,
        message: 'Error al crear usuario',
        answer: err
      });
    }

  } else if(req.auth.data.type === 'User') {
    res.status(401).json({
      error: true,
      code: 401,
      message: 'No autorizado para crear usuario',
    });
  }
}

const getAllUsers = async (req, res) => {
  if(req.auth.data.type === 'Admin') {
    try {
      const users = await User.findAll( { attributes: {exclude: ['password']} } );
      res.status(200).json({
        error: false,
        code: 200,
        message: 'Listado de usuarios',
        answer: users
      });
    }
    catch (err) {
      res.status(400).json({
        error: true,
        code: 400,
        message: 'Error al listar usuarios',
        answer: err
      }
      );
    }
  } else if(req.auth.data.type === 'User') {
    try {
      const users = await User.findAll( { attributes: {exclude: ['password', 'profile', 'createdAt', 'updatedAt']}, where: {id: req.auth.data.id} } );
      res.status(206).json({
        error: false,
        code: 206,
        message: 'Datos de usuario',
        answer: users
      });
    }
    catch (err) {
      res.status(400).json({
        error: true,
        code: 400,
        message: 'Error al listar usuarios',
        answer: err
      }
      );
    }
  } else {
    res.status(401).json({
      error: true,
      code: 401,
      message: 'No autorizado para ver lista de usuarios',
    });
  }
}

const getUserById = async (req, res) => {
  if(req.auth.data.type === 'Admin') {
    try {
      const user = await User.findOne({where: {id: req.params.id}, attributes: { exclude: ['password'] }});
      res.status(200).json({
        error: false,
        code: 200,
        message: 'Datos del usuario',
        answer: user
      });
    }
    catch (err) {
      res.status(400).json({
        error: true,
        code: 400,
        message: 'Error al listar usuario',
        answer: err
      });
    }
  } else if (req.params.id == req.auth.data.id) {
    try {
      const user = await User.findOne({where: {id: req.params.id}, attributes: { exclude: ['password', 'profile', 'createdAt', 'updatedAt'] }});
      res.status(206).json({
        error: false,
        code: 206,
        message: 'Datos del usuario',
        answer: user
      });
    }
    catch (err) {
      res.status(400).json({
        error: true,
        code: 400,
        message: 'Error al listar usuario',
        answer: err
      });
    }
  } else {
    res.status(401).json({
      error: true,
      code: 401,
      message: 'No autorizado para ver detalles de usuario',
    });
  }
}

const updateUser = async (req, res) => {
  if(req.auth.data.type === 'Admin') {
    try {
      const { firstName, lastName, email, password, profile } = req.body;
      const user = await User.update({firstName, lastName, email, password, profile}, {where: {id: req.params.id}});
      res.status(201).json({
        error: false,
        code: 201,
        message: 'Usuario modificado',
        answer: user
      });
    }
    catch (err) {
      res.status(400).json({
        error: true,
        code: 400,
        message: 'Error al modificar usuario',
        answer: err
      });
    }
  } else if(req.params.id == req.auth.data.id) {
    try {
      const { firstName, lastName, password } = req.body;
      const user = await User.update({firstName, lastName, password}, {where: {id: req.auth.data.id}});
      res.status(201).json({
        error: false,
        code: 201,
        message: 'Usuario modificado',
        answer: user
      });
    }
    catch (err) {
      res.status(400).json({
        error: true,
        code: 400,
        message: 'Error al modificar usuario',
        answer: err
      });
    }
  }
  else {
    res.status(401).json({
      error: true,
      code: 401,
      message: 'No autorizado para modificar usuario',
    });
  }
}

const deleteUser = async (req, res) => {
  if(req.auth.data.type === 'Admin') {
    try {
      const user = await User.destroy({where: {id: req.params.id}});
      res.status(200).json({
        error: false,
        code: 200,
        message: 'Usuario eliminado',
        answer: user
      });
    }
    catch (err) {
      res.status(400).json({
        error: true,
        code: 400,
        message: 'Error al eliminar usuario',
        answer: err
      });
    }
  } else {
    res.status(401).json({
      error: true,
      code: 401,
      message: 'No autorizado para eliminar usuarios',
    });
  }
}

module.exports = { createUser, getAllUsers, getUserById, updateUser ,deleteUser };