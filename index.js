const axios = require('axios');

// Base URL of the Book Store API
const BASE_URL = 'https://your-api-url.com'; // Replace with actual API URL

// Task 10: Get all books – Using async/await
async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    console.log('📚 All Books:', response.data);
  } catch (error) {
    console.error('Error fetching all books:', error.message);
  }
}

// Task 11: Search by ISBN – Using Promises
function getBookByISBN(isbn) {
  axios.get(`${BASE_URL}/books/isbn/${isbn}`)
    .then(response => {
      console.log(`🔍 Book with ISBN ${isbn}:`, response.data);
    })
    .catch(error => {
      console.error(`Error fetching book with ISBN ${isbn}:`, error.message);
    });
}

// Task 12: Search by Author – Using async/await
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`${BASE_URL}/books/author/${author}`);
    console.log(`🖊️ Books by ${author}:`, response.data);
  } catch (error) {
    console.error(`Error fetching books by ${author}:`, error.message);
  }
}

// Task 13: Search by Title – Using Promises
function getBooksByTitle(title) {
  axios.get(`${BASE_URL}/books/title/${title}`)
    .then(response => {
      console.log(`📖 Books with title "${title}":`, response.data);
    })
    .catch(error => {
      console.error(`Error fetching books with title "${title}":`, error.message);
    });
}

// Sample calls
getAllBooks();
getBookByISBN('1234567890');
getBooksByAuthor('J.K. Rowling');
getBooksByTitle('Harry Potter');