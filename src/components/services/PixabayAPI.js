const key = "39898050-fc2f5ee7469f143421985ee86";
const image_type = 'photo';

// const BASE_API_URL = 'https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12'

const BASE_API_URL = 'https://pixabay.com/api';

  // Timeout a fetch() Request
  async function fetchWithTimeout(resource, options) {
    // console.log('resource: ', resource);
    const { timeout = 8000 } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    // console.log('response: ', response);
    return response;
  }

  /**
   * Category name to get a list of books in this category.
   * Will receive a collection of 20 books of a certain category
   */
  async function fetchGetAllItems(q, page) {
    try {
      const response = await fetchWithTimeout(
        `${BASE_API_URL}/?q=${q}&page=${page}&key=${key}&image_type=${image_type}&orientation=horizontal&per_page=12`,
        {
          timeout: 6000,
        },
      );
      // ok - shorthand for checking that the status is in the range 2xx (boolean)
      if (!response.ok) {
        throw new Error(
          `Network response was not OK - HTTP error: ${response.status}`,
        );
      }
      // console.log('response: ', response);
      const data = await response.json();
      // debugger;
      return data;
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error.message,
      );
    }
  }
// }

export default fetchGetAllItems
