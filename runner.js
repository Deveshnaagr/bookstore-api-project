const { getAllBooks, searchByISBN, searchByAuthor, searchByTitle } = require('./bookstore_client');

const testISBN = '9781234567897';
const testAuthor = 'John Doe';
const testTitle = 'The Great Book';

async function runAllTasks() {
  console.log('--- Task 10: Get all books ---'); await getAllBooks();
  console.log('\n--- Task 11: Search by ISBN ---'); await searchByISBN(testISBN);
  console.log('\n--- Task 12: Search by Author ---'); await searchByAuthor(testAuthor);
  console.log('\n--- Task 13: Search by Title ---'); await searchByTitle(testTitle);
  console.log('\n--- All tasks executed successfully ---');
}

runAllTasks();