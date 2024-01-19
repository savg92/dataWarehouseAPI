/* requierd modules */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const { expressjwt: jwt } = require('express-jwt');

const { PORT, APP_KEY } = process.env;

/* Import routes modules */
const routes = require('./routes');
const messagesRouter = require('./routes/message');
const usersRouter = require('./routes/user');

const app = express();

app.use(cors());

/*set up protected routes using express-jwt*/
app.use(
	jwt({ secret: `${APP_KEY}`, algorithms: ['HS512'] }).unless({
		path: ['/api/login', '/api/register'],
	})
);

/* view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/* Middlewares */
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Routes */
app.use('/api', routes);
app.use('/api/users', usersRouter);
app.use('/api/messages', messagesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;