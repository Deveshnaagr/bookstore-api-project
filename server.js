const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
  { isbn: '9781234567897', title: 'The Great Book', author: 'John Doe', reviews: [] },
  { isbn: '9789876543210', title: 'Learn Node.js', author: 'Jane Smith', reviews: [] }
];

let users = [];
let tokens = {};

function generateToken(username) {
  const token = Math.random().toString(36).substring(2);
  tokens[token] = username;
  return token;
}

// Routes
app.get('/books', (req, res) => res.json(books));
app.get('/books/isbn/:isbn', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  book ? res.json(book) : res.status(404).json({ message: 'Book not found' });
});
app.get('/books/author/:author', (req, res) => res.json(books.filter(b => b.author === req.params.author)));
app.get('/books/title/:title', (req, res) => res.json(books.filter(b => b.title === req.params.title)));
app.get('/books/:isbn/review', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  book ? res.json(book.reviews) : res.status(404).json({ message: 'Book not found' });
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) return res.status(400).json({ message: 'User exists' });
  users.push({ username, password });
  res.json({ message: 'User registered successfully', username });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const token = generateToken(username);
  res.json({ message: 'Login successful', token });
});

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });
  const token = authHeader.split(' ')[1];
  if (!tokens[token]) return res.status(401).json({ message: 'Invalid token' });
  req.username = tokens[token];
  next();
}

app.put('/books/:isbn/review', auth, (req, res) => {
  const { rating, review } = req.body;
  const book = books.find(b => b.isbn === req.params.isbn);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  const existing = book.reviews.find(r => r.username === req.username);
  if (existing) { existing.rating = rating; existing.review = review; }
  else { book.reviews.push({ username: req.username, rating, review }); }
  res.json({ message: 'Review added/updated successfully' });
});

app.delete('/books/:isbn/review', auth, (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  book.reviews = book.reviews.filter(r => r.username !== req.username);
  res.json({ message: 'Review deleted successfully' });
});

app.listen(PORT, () => console.log(`Bookstore server running at http://localhost:${PORT}`));