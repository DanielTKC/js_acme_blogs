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

// toggleCommentButton
// Changes button text between "Show Comments" and "Hide Comments".

// **Parameters:**
// - `postId` (number) - The post ID for the button
//
// **Implementation:**
// - Select the button with `data-post-id` attribute equal to `postId`
// - If button text is `'Show Comments'`, change to `'Hide Comments'`
// - If button text is `'Hide Comments'`, change to `'Show Comments'`
// - *Suggestion: Use a ternary statement*
// - Return the button element
//
//

const toggleCommentButton = (postId) => {
  if (!postId) return undefined;
  const button = document.querySelector(`button[data-post-id="${postId}"]`);
  if (!button) return null;
  button.textContent = (button.textContent === 'Show Comments') ? 'Hide Comments' : 'Show Comments';
  return button;

};

// deleteChildElements
// Removes all child elements from a parent element.
//
// **Parameters:**
// - `parentElement` (HTMLElement) - The parent element to clear
//
// **Implementation:**
// - Define `child` variable as `parentElement.lastElementChild`
// - Use a while loop: while child exists
// - Use `parentElement.removeChild()` to remove the child
// - Reassign `child` to `parentElement.lastElementChild`
// - Return the `parentElement`
//
// ---

const deleteChildElements = (parentElement) => {
  if (!parentElement?.tagName) return undefined;
  let child = parentElement.lastElementChild;
  while (child) {

    parentElement.removeChild(child);
    child = parentElement.lastElementChild;

  }
  return parentElement;
};

//  addButtonListeners
// Adds click event listeners to all buttons in the main element.
//
// **Implementation:**
// - Select all buttons nested inside the main element
// - If buttons exist, loop through the NodeList
// - For each button:
//   - Get `postId` from `button.dataset.postId`
// - If `postId` exists, add a click event listener
// - The listener calls an anonymous function
// - Inside the anonymous function, call `toggleComments(event, postId)`
// - Return the button elements
// - *Note: Define an empty `toggleComments` function for initial testing*
//
//

const addButtonListeners = () => {
  const buttons = document.querySelectorAll("main button");

  buttons.forEach(button => {
    const postId = button.dataset.postId;
    if (postId) {
      button.addEventListener("click", (event) => {
        toggleComments(event, postId);
      });
    }
  });
  return buttons;
};

const toggleComments = (event, postId) => {
  return 0;

};


// removeButtonListeners
// Removes click event listeners from all buttons in the main element.
//
// **Implementation:**
// - Select all buttons nested inside the main element
// - Loop through the NodeList of buttons
// - For each button:
//   - Get `postId` from `button.dataset.id`
// - If `postId` exists, remove the click event listener
// - Nearly identical to `addButtonListeners`
// - Return the button elements

const removeButtonListeners = () => {
  const buttons = document.querySelectorAll("main button");
  buttons.forEach(button => {
    const postId = button.dataset.postId;
    if (postId) {
      button.removeEventListener("click", (event) => {
        toggleComments(event, postId);
      });
    }
  });
  return buttons;
};