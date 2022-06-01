const express = require("express");
const mongoose = require('mongoose');
const Item = require('./models/items');
const MONGODB_PASS = require('./envVar');

const app = express();

app.use(express.urlencoded({ extended: true }));

const mongodb = MONGODB_PASS;

mongoose
	.connect(mongodb)
	.then(() => console.log('connected'))
	.catch((err) => console.log('an error occured ', err));

app.set('view engine', 'ejs');

app.listen(3000);

// app.get('/create-item', (req, res) => {
// 	const item = new Item({
// 		name: 'computer',
// 		price: '2000',
// 	});

// 	item.save().then((result) => res.send(result));
// });

// // app.get('/get-items', (req, res) => {
// // 	Item.findById(//provide id here)
// // 		.then((result) => res.send(result))
// // 		.catch((err) => console.log(err));
// // });

// app.get('/get-item', (req, res) => {
// 	Item.find()
// 		.then((result) => res.send(result))
// 		.catch((err) => console.log(err));
// });

app.get('/', (req, res) => {
	res.redirect('/get-items');
});

app.get('/get-items', (req, res) => {
	Item.find()
		.then((result) => {
			res.render('index', { items: result });
		})
		.catch((err) => console.log(err));
});

app.get('/add-item', (req, res) => {
	res.render('add-item');
});

app.post('/items', (req, res) => {
	const item = Item(req.body);

	item
		.save()
		.then(() => {
			res.redirect('/get-items');
		})
		.catch((err) => console.log(err));
});

app.get('/items/:id', (req, res) => {
	const id = req.params.id;
	Item.findById(id).then((result) => {
		res.render('item-detail', { item: result });
	});
});

app.delete('/items/:id', (req, res) => {
	const id = req.params.id;
	Item.findByIdAndDelete(id).then((result) => {
		res.json({ redirect: '/' });
	});
});

app.put('/items/:id', (req, res) => {
	const id = req.params.id;
	Item.findByIdAndUpdate(id, req.body).then((result) => {
		res.json({ message: 'Update successfully' });
	});
});

app.use((req, res) => {
	res.render('404');
});
