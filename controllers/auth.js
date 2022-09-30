const { User } = require('../models');
const { APP_KEY } = process.env;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/* loginUsers: Función que permite a un usuario loguearse en la aplicación. */
const loginUsers = async (req, res) => {
    const { email, password } = req.body;
    let query = {};
    let where = {};

    // if (email) {
    //     where.email = email;
    // }
    // //  else if (password) {
    // //     where.password = password;
    // // }

    // query.where = where;

    // const passwordHash = bcrypt.hashSync(password, 10);

    // // function to check if the email is correct
    // const validateEmail = await User.findOne(query)
    // .catch(err => console.log("error", err))
    // if (!validateEmail) {
    // return res.json({ message: "Usuario o contraseña incorrecta" })
    // }

    // // function to check if the password is correct
    // const validatePassword = await User.findOne({ where: { passwordHash } })
    // .catch(err => console.log("error", err))
    // if (!validatePassword) {
    //     return res.json({ message: "Usuario o contraseña incorrecta" })
    // }

    // find the user by email
    const user = await User.findOne({ where: { email } })

    // set a variable to check if the password is correct
    let validatePassword = false

    // compare the typed password with the password in the database
    if (user) {
        validatePassword = bcrypt.compareSync(password, user.password)
    }

    // if the email or password isn't correct, return an error
    if (!user || !validatePassword) {
        return res.json({
            error: true,
            message: "Usuario o contraseña incorrecta"
        })
    }

    // create info to be stored in the token
    const userToken= {
        id: user.id,
        name: user.firstName,
        type: user.profile
    }

    //create token
    const tkn = jwt.sign(
        { exp: Math.floor(Date.now() / 1000) + (60 * 30), data: userToken },
        `${APP_KEY}`,
        { algorithm: 'HS512' },
    );

    res.cookie('token', tkn, { httpOnly: true }).json({ message: `Bienvenido/a ${user.firstName}!`, token: tkn });
}

/* logOut: Función que permite a un usuario cerrar sesión en la aplicación. */
const logOut = async (req, res) => {
    const tkn = jwt.sign(
        { exp: Math.floor(Date.now() / 1000) + (1), data: null },
        `expired key`,
        { algorithm: 'HS512' },
    );
    res
    .cookie('token', tkn, { httpOnly: true })
    .clearCookie('token')
    .json({ message: 'Sesión cerrada' })
}

module.exports = { loginUsers, logOut };