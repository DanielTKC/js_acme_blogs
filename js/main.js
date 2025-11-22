// createElemWithText
// Creates an HTML element with specified text content and optional class name.
//
// **Parameters:**
// - `elementName` (string, default: `"p"`) - HTML element to create (h1, p, button, etc.)
// - `textContent` (string, default: `""`) - Text content for the element
// - `className` (string, optional) - CSS class to apply
//
// **Implementation:**
// - Use `document.createElement()` to create the element
// - Set the text content and class name attributes
// - Return the created element



const createElemWithText = (elementName ="p", textContent = "", className) => {
  const element = document.createElement(elementName);
  element.textContent = textContent;
  if (className) {
    element.className = className;
  }
  return element;
};


// createSelectOptions
// Generates option elements from users JSON data.
//
// **Parameters:**
// - `users` (array) - JSON data from https://jsonplaceholder.typicode.com/users
//
//   **Implementation:**
// - Return `undefined` if no parameter received
// - Loop through users data
// - For each user, create an option element with `document.createElement()`
// - Set `option.value` to `user.id`
// - Set `option.textContent` to `user.name`
// - Return an array of option elements
//
//

const createSelectOptions = (users) => {
  if (!users) return undefined;
  return users.map(user => {
    const option = document.createElement("option");
    option.value = user.id;
    option.textContent = user.name;
    return option;
  });
};

// console.log(createSelectOptions(testUsers));
//
// toggleCommentSection
// Toggles visibility of a comment section for a specific post.
//
// **Parameters:**
// - `postId` (number) - The post ID to toggle
//
// **Implementation:**
// - Select the section element with `data-post-id` attribute equal to `postId`
// - Verify the section exists before accessing `classList`
// - Toggle the `'hide'` class on the section element
// - Return the section element
//
//

const toggleCommentSection = (postId) => {
  if (!postId) return undefined;
  const section = document.querySelector(`section[data-post-id="${postId}"]`);
  if (!section) return null;
  section.classList.toggle('hide');
  return section;
};