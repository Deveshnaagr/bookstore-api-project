const axios = require('axios');
const BASE = 'http://localhost:3000'; 

async function getAllBooks() {
  try { const res = await axios.get(`${BASE}/books`); console.log('All Books:', res.data); return res.data; }
  catch (err) { console.error('Error in getAllBooks:', err.response?.data || err.message); }
}

function searchByISBN(isbn) {
  return axios.get(`${BASE}/books/isbn/${encodeURIComponent(isbn)}`)
    .then(res => { console.log('Search by ISBN:', res.data); return res.data; })
    .catch(err => { console.error('Error in searchByISBN:', err.response?.data || err.message); });
}

async function searchByAuthor(author) {
  try { const res = await axios.get(`${BASE}/books/author/${encodeURIComponent(author)}`); console.log('Search by Author:', res.data); return res.data; }
  catch (err) { console.error('Error in searchByAuthor:', err.response?.data || err.message); }
}

function searchByTitle(title) {
  return axios.get(`${BASE}/books/title/${encodeURIComponent(title)}`)
    .then(res => { console.log('Search by Title:', res.data); return res.data; })
    .catch(err => { console.error('Error in searchByTitle:', err.response?.data || err.message); });
}

module.exports = { getAllBooks, searchByISBN, searchByAuthor, searchByTitle };