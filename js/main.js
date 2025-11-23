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


const createElemWithText = (elementName = "p", textContent = "", className) => {
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
        toggleComments(event, postId)}, false);
    }
  });
  return buttons;
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

// createComments
// **Dependencies:** `createElemWithText`
//
// Creates comment elements from JSON data.
//
// **Parameters:**
// - `comments` (array) - JSON comments data
//
// **Implementation:**
// - Create a fragment with `document.createDocumentFragment()`
// - Loop through comments
// - For each comment:
//   - Create an article element with `document.createElement()`
// - Create an h3 with `createElemWithText('h3', comment.name)`
// - Create a paragraph with `createElemWithText('p', comment.body)`
// - Create a paragraph with `createElemWithText('p', \`From: ${comment.email}\`)`
// - Append the h3 and paragraphs to the article
// - Append the article to the fragment
// - Return the fragment element

const createComments = (comments) => {
  if (!comments) return undefined;
  const fragment = document.createDocumentFragment();
  comments.forEach(comment => {
    const article = document.createElement("article");
    const h3 = createElemWithText("h3", comment.name);
    const pBody = createElemWithText("p", comment.body);
    const pEmail = createElemWithText("p", `From: ${comment.email}`);

    article.append(h3, pBody,pEmail);
    fragment.append(article);

  });
  return fragment;
};

// populateSelectMenu
// **Dependencies:** `createSelectOptions`
//
// Populates the select menu with user options.
//
// **Parameters:**
// - `users` (array) - Users JSON data
//
// **Implementation:**
// - Select the `#selectMenu` element by id
// - Pass users data to `createSelectOptions()`
// - Receive an array of option elements
// - Loop through options and append each to the select menu
// - Return the `selectMenu` element

const populateSelectMenu = (users) => {
  // I put the commented out line first and it does pass the check in the test, but it feels wrong.
  // It should be checking for an array, not a string.
  // if (typeof users !== 'string' ) return undefined;
  if (!Array.isArray(users)) return undefined;
  const selectMenu = document.getElementById("selectMenu");
  const options = createSelectOptions(users);
  options.forEach(option => {
    selectMenu.append(option);
  });
  return selectMenu;
};

// getUsers
// Fetches all users from the API.

// **Implementation:**
// - Should be an async function
// - Use try/catch block
// - Fetch from: https://jsonplaceholder.typicode.com/users
//   - Await the response
// - Return the JSON data

const getUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

// getUserPosts
// Fetches all posts for a specific user.
//
// **Parameters:**
// - `userId` (number) - The user ID
//
// **Implementation:**
// - Should be an async function
// - Use try/catch block
// - Fetch from: https://jsonplaceholder.typicode.com/posts?userId={userId}
//   - Await the response
// - Return the JSON data

const getUserPosts = async (userId) => {
  if (!userId) return undefined;
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error);
    return [];
  }
};

// getUser
// Fetches data for a specific user.
//
// **Parameters:**
// - `userId` (number) - The user ID
//
// **Implementation:**
// - Should be an async function
// - Use try/catch block
// - Fetch from: https://jsonplaceholder.typicode.com/users/{userId}
//   - Await the response
// - Return the JSON data
const getUser = async (userId) => {
  if (!userId || userId < 1) return undefined;
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    return null;
  }
};

// getPostComments
// Fetches all comments for a specific post.
//
// **Parameters:**
// - `postId` (number) - The post ID
//
// **Implementation:**
// - Should be an async function
// - Use try/catch block
// - Fetch from: https://jsonplaceholder.typicode.com/comments?postId={postId}
//   - Await the response
// - Return the JSON data

const getPostComments = async (postId) => {
  if (!postId) return undefined;
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    return null;
  }
};

// displayComments
// **Dependencies:** `getPostComments`, `createComments`
//
// Creates and returns a section element with comments.
//
// **Parameters:**
// - `postId` (number) - The post ID
//
// **Implementation:**
// - Should be an async function
// - Create a section element with `document.createElement()`
// - Set `section.dataset.postId` attribute
// - Add classes `'comments'` and `'hide'` to the section
// - Create variable: `comments = await getPostComments(postId)`
// - Create variable: `fragment = createComments(comments)`
// - Append fragment to section
// - Return the section element

const displayComments = async (postId) => {
  if (!postId) return undefined;
  const section = document.createElement("section");
  section.dataset.postId = postId;
  section.classList.add("comments", "hide");
  const comments = await getPostComments(postId);
  const fragment = createComments(comments);
  section.append(fragment);
  return section;
};

// createPosts
// **Dependencies:** `createElemWithText`, `getUser`, `displayComments`
//
// Creates post elements from JSON data.
//
// **Parameters:**
// - `posts` (array) - Posts JSON data
//
// **Implementation:**
// - Should be an async function
// - Create a fragment with `document.createDocumentFragment()`
// - Loop through posts data
// - For each post:
//   - Create an article element
// - Create an h2 with the post title
// - Create a paragraph with the post body
// - Create a paragraph with `\`Post ID: ${post.id}\``
// - Define: `author = await getUser(post.userId)`
// - Create a paragraph with `\`Author: ${author.name} with ${author.company.name}\``
// - Create a paragraph with author's company catch phrase
// - Create a button with text `'Show Comments'`
// - Set `button.dataset.postId = post.id`
// - Create: `section = await displayComments(post.id)`
// - Append h2, paragraphs, button, and section to article
// - Append article to fragment
// - Return the fragment element

const createPosts = async (posts) => {
  if (!posts) return undefined;
  const fragment = document.createDocumentFragment();
  // interesting to learn that forEach does not wait for the promises returned by async callbacks.
  for (const post of posts) {
    const article = document.createElement("article");
    const h2 = createElemWithText("h2", post.title);
    const pBody = createElemWithText("p", post.body);
    const pPostId = createElemWithText("p", `Post ID: ${post.id}`);
    const author = await getUser(post.userId);
    const pAuthor = createElemWithText("p", `Author: ${author.name} with ${author.company.name}`);
    const pCompanyCatchPhrase = createElemWithText("p", author.company.catchPhrase);
    const showCommentsButton = createElemWithText("button", "Show Comments");
    showCommentsButton.dataset.postId = post.id;
    const section = await displayComments(post.id);

    article.append(h2, pBody, pPostId, pAuthor, pCompanyCatchPhrase, showCommentsButton, section);

    fragment.append(article);
  }
  return fragment;
};

// displayPosts
// **Dependencies:** `createPosts`, `createElemWithText`
//
// Displays posts in the main element.
//
// **Parameters:**
// - `posts` (array) - Posts data
//
// **Implementation:**
// - Should be an async function
// - Select the main element
// - Define `element` variable:
//   - If posts exist: `element = await createPosts(posts)`
// - If posts don't exist: create default paragraph (identical to HTML file)
// - *Suggestion: Use a ternary operator*
// - Append element to main element
// - Return the element variable
const displayPosts = async (posts) => {
  const main = document.querySelector("main");
  const element = posts ? await createPosts(posts) : createElemWithText(
    "p", "Select an Employee to display their posts.", "default-text");
  main.append(element);
  return element;
}

// toggleComments
// **Dependencies:** `toggleCommentSection`, `toggleCommentButton`
//
// Handles comment toggle functionality.
//
// **Parameters:**
// - `event` (Event) - The click event
// - `postId` (number) - The post ID
//
// **Implementation:**
// - Set `event.target.listener = true` (required for testing)
//   - Pass `postId` to `toggleCommentSection()`
// - Store the returned section element
// - Pass `postId` to `toggleCommentButton()`
// - Store the returned button element
// - Return `[section, button]`
const toggleComments = (event, postId) => {
  if (!event || !postId) return undefined;
  event.target.listener = true;
  const section = toggleCommentSection(postId);
  const button = toggleCommentButton(postId);
  return [section, button];

};

// refreshPosts
// **Dependencies:** `removeButtonListeners`, `deleteChildElements`, `displayPosts`, `addButtonListeners`
//
// Refreshes the posts display with new data.
//
// **Parameters:**
// - `posts` (array) - Posts JSON data
//
// **Implementation:**
// - Should be an async function
// - Call `removeButtonListeners()`
// - Store the returned buttons
// - Call `deleteChildElements(main)`
// - Store the returned main element
// - Call `await displayPosts(posts)`
// - Store the returned fragment
// - Call `addButtonListeners()`
// - Store the returned buttons
// - Return `[removeButtons, main, fragment, addButtons]`

const refreshPosts = async (posts) => {
  if (!posts) return undefined;
  const removeButtons = removeButtonListeners();
  const main = deleteChildElements(document.querySelector("main"));
  const fragment = await displayPosts(posts);
  const addButtons = addButtonListeners();
  return [removeButtons, main, fragment, addButtons];
};

// selectMenuChangeEventHandler
// **Dependencies:** `getUserPosts`, `refreshPosts`
//
// Handles select menu change events.
//
// **Parameters:**
// - `event` (Event) - Automatically received
//
// **Implementation:**
// - Should be an async function
// - Disable the select menu (`disabled` property)
// - Define: `userId = event.target.value || 1`
// - Pass `userId` to `await getUserPosts(userId)`
// - Store the returned posts data
// - Pass posts to `await refreshPosts(posts)`
// - Store the returned `refreshPostsArray`
// - Enable the select menu
// - Return `[userId, posts, refreshPostsArray]`

const selectMenuChangeEventHandler = async (event) => {
  if (!event) return undefined;
  const selectMenu = event.target;
  if (selectMenu) {
    selectMenu.disabled = true;
  }
  const userId = Number(event?.target?.value) || 1;
  const posts = await getUserPosts(userId);
  const refreshPostsArray = await refreshPosts(posts);
  if (selectMenu) {
    selectMenu.disabled = false;
  }
  return [userId, posts, refreshPostsArray];
};

// initPage
// Dependencies: getUsers, populateSelectMenu
//
// Initializes the page on load.
//
//   Implementation:
//
// Should be an async function
// No parameters
// Call await getUsers()
// Store the returned users data
// Pass users to populateSelectMenu(users)
// Store the returned select element
// Return [users, select]
const initPage = async () => {
  const users = await getUsers();
  const select = populateSelectMenu(users);
  return [users, select];
};

// initApp
// Dependencies: initPage, selectMenuChangeEventHandler
//
// Initializes the application.
//
//   Implementation:
//
// Call initPage()
// Select the #selectMenu element by id
// Add event listener to #selectMenu for the "change" event
// Event listener should call selectMenuChangeEventHandler
// Does not return anything
const initApp = async () => {
  await initPage();
  const selectMenu = document.getElementById("selectMenu");
  selectMenu.addEventListener("change", selectMenuChangeEventHandler);

}

document.addEventListener("DOMContentLoaded", initApp);
