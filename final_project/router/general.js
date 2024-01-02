const express = require('express');
let books = require('./booksdb.js');
let isValid = require('./auth_users.js').isValid;
let users = require('./auth_users.js').users;
const public_users = express.Router();

public_users.post('/register', (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({ message: 'Username and password are required' });
	}

	if (isValid(username)) {
		users.push({ username, password });
		return res.status(201).json({ message: 'User registered successfully' });
	} else {
		return res.status(401).json({ message: 'Username already exists' });
	}
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
	try {
		const result = await new Promise((resolve) => {
			setTimeout(() => {
				resolve({ message: 'Success', data: books });
			}, 1000);
		});

		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error', error });
	}
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
	try {
		const { isbn } = req.params;

		const book = books[isbn];

		if (book) {
			const result = await new Promise((resolve) => {
				setTimeout(() => {
					resolve({ message: 'Success', data: book });
				}, 1000);
			});

			res.status(200).json(result);
		} else {
			res.status(404).json({ message: 'Book not found' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error', error });
	}
});

// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
	try {
		const { author } = req.params;

		const book = Object.values(books).find((b) => b.author === author);

		if (book) {
			const result = await new Promise((resolve) => {
				setTimeout(() => {
					resolve({ message: 'Success', data: book });
				}, 1000);
			});

			res.status(200).json(result);
		} else {
			res.status(404).json({ message: 'Book not found' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error', error });
	}
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
	try {
		const { title } = req.params;

		const book = Object.values(books).find((b) => b.title === title);

		if (book) {
			const result = await new Promise((resolve) => {
				setTimeout(() => {
					resolve({ message: 'Success', data: book });
				}, 1000);
			});

			res.status(200).json(result);
		} else {
			res.status(404).json({ message: 'Book not found' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error', error });
	}
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
	const { isbn } = req.params;

	const book = books[isbn];

	if (book) {
		const review = book.reviews;
		return res.status(200).json({ message: 'Success', data: review });
	} else {
		return res.status(400).json({ message: 'Book not found' });
	}
});

module.exports.general = public_users;
