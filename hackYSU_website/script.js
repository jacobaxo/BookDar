async function searchBooks() {
  const bookTitle = document.getElementById('search-bar').value;
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookTitle)}`);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      data.items.forEach(item => {
        const bookInfo = item.volumeInfo;
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book-result');

        const bookCover = document.createElement('img');
        bookCover.src = bookInfo.imageLinks && bookInfo.imageLinks.thumbnail ? bookInfo.imageLinks.thumbnail : 'no-image-available.jpg';
        bookCover.alt = bookInfo.title;
        bookDiv.appendChild(bookCover);

        const title = document.createElement('h3');
        title.textContent = bookInfo.title;
        bookDiv.appendChild(title);

        const authors = document.createElement('p');
        authors.textContent = `Authors: ${bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown'}`;
        bookDiv.appendChild(authors);

        const pageCount = document.createElement('p');
        pageCount.textContent = `Pages: ${bookInfo.pageCount ? bookInfo.pageCount : 'Unknown'}`;
        bookDiv.appendChild(pageCount);


        bookDiv.appendChild(document.createElement('br'));

        const bookLinks = document.createElement('div');
        bookLinks.classList.add('book-links');

        if (bookInfo.previewLink) {
          const previewLink = document.createElement('a');
          previewLink.textContent = 'Preview';
          previewLink.href = bookInfo.previewLink;
          previewLink.target = '_blank';
          bookLinks.appendChild(previewLink);

          const separator = document.createTextNode(' | ');
          bookLinks.appendChild(separator);
        }

        if (bookInfo.canonicalVolumeLink) {
          const purchaseLink = document.createElement('a');
          purchaseLink.textContent = 'Purchase';
          purchaseLink.href = bookInfo.canonicalVolumeLink;
          purchaseLink.target = '_blank';
          bookLinks.appendChild(purchaseLink);
        }

        bookDiv.appendChild(bookLinks);


        bookDiv.appendChild(document.createElement('hr'));

        resultsDiv.appendChild(bookDiv);


        resultsDiv.appendChild(document.createElement('br'));
      });
    } else {
      resultsDiv.innerHTML = "No matching books found.";
    }
  } catch (error) {
    console.error("Error fetching book data:", error);
    resultsDiv.innerHTML = "An error occurred while fetching book data. Please try again later.";
  }
}
