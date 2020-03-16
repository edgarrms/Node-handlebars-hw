const express = require('express');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3000;

const burgerController = require('./controller/burgerController');
const htmlRoutes = require('./routes');

const app = express();

//for parsing json in req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

//configure handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//for our controller routes
//or api routes
app.use(burgerController);
app.use(htmlRoutes);

app.listen(PORT, function() {
	console.log(`PORT IS LISTENING ON ${PORT}`);
});
