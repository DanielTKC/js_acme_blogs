# Acme Blogs

[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/gitdagray/js_acme_blogs)

**Start by clicking the Remix on Glitch button above.**

_Once you are working with your own copy of the project on Glitch..._

**Follow the directions available in Blackboard**

_DO NOT CHANGE any of the pre-existing code. Your code only goes in main.js._

Did you miss some?

It's ok. Go back and make corrections. Then check your score again!

When you are ready to submit your work, follow the instructions that are at the top of the score page.

### Academic Honesty

**DO NOT COPY** - Avoid plagiargism and adhere to the spirit of this [Academic Honesty Policy](https://www.freecodecamp.org/news/academic-honesty-policy/).


# JavaScript Functions Implementation Guide

## Overview
This guide outlines 21 functions to build a dynamic web application that fetches and displays user posts and comments from JSONPlaceholder API.

---

## Section 1: Utility Functions
*Self-contained functions with no dependencies*

### 1. createElemWithText
Creates an HTML element with specified text content and optional class name.

**Parameters:**
- `elementName` (string, default: `"p"`) - HTML element to create (h1, p, button, etc.)
- `textContent` (string, default: `""`) - Text content for the element
- `className` (string, optional) - CSS class to apply

**Implementation:**
- Use `document.createElement()` to create the element
- Set the text content and class name attributes
- Return the created element

---

### 2. createSelectOptions
Generates option elements from users JSON data.

**Parameters:**
- `users` (array) - JSON data from https://jsonplaceholder.typicode.com/users

**Implementation:**
- Return `undefined` if no parameter received
- Loop through users data
- For each user, create an option element with `document.createElement()`
- Set `option.value` to `user.id`
- Set `option.textContent` to `user.name`
- Return an array of option elements

---

### 3. toggleCommentSection
Toggles visibility of a comment section for a specific post.

**Parameters:**
- `postId` (number) - The post ID to toggle

**Implementation:**
- Select the section element with `data-post-id` attribute equal to `postId`
- Verify the section exists before accessing `classList`
- Toggle the `'hide'` class on the section element
- Return the section element

---

### 4. toggleCommentButton
Changes button text between "Show Comments" and "Hide Comments".

**Parameters:**
- `postId` (number) - The post ID for the button

**Implementation:**
- Select the button with `data-post-id` attribute equal to `postId`
- If button text is `'Show Comments'`, change to `'Hide Comments'`
- If button text is `'Hide Comments'`, change to `'Show Comments'`
- *Suggestion: Use a ternary statement*
- Return the button element

---

### 5. deleteChildElements
Removes all child elements from a parent element.

**Parameters:**
- `parentElement` (HTMLElement) - The parent element to clear

**Implementation:**
- Define `child` variable as `parentElement.lastElementChild`
- Use a while loop: while child exists
    - Use `parentElement.removeChild()` to remove the child
    - Reassign `child` to `parentElement.lastElementChild`
- Return the `parentElement`

---

## Section 2: Event Listener Functions
*Functions with small dependencies*

### 6. addButtonListeners
Adds click event listeners to all buttons in the main element.

**Implementation:**
- Select all buttons nested inside the main element
- If buttons exist, loop through the NodeList
- For each button:
    - Get `postId` from `button.dataset.postId`
    - If `postId` exists, add a click event listener
    - The listener calls an anonymous function
    - Inside the anonymous function, call `toggleComments(event, postId)`
- Return the button elements
- *Note: Define an empty `toggleComments` function for initial testing*

---

### 7. removeButtonListeners
Removes click event listeners from all buttons in the main element.

**Implementation:**
- Select all buttons nested inside the main element
- Loop through the NodeList of buttons
- For each button:
    - Get `postId` from `button.dataset.id`
    - If `postId` exists, remove the click event listener
- Nearly identical to `addButtonListeners`
- Return the button elements

---

## Section 3: DOM Creation Functions

### 8. createComments
**Dependencies:** `createElemWithText`

Creates comment elements from JSON data.

**Parameters:**
- `comments` (array) - JSON comments data

**Implementation:**
- Create a fragment with `document.createDocumentFragment()`
- Loop through comments
- For each comment:
    - Create an article element with `document.createElement()`
    - Create an h3 with `createElemWithText('h3', comment.name)`
    - Create a paragraph with `createElemWithText('p', comment.body)`
    - Create a paragraph with `createElemWithText('p', \`From: ${comment.email}\`)`
    - Append the h3 and paragraphs to the article
    - Append the article to the fragment
- Return the fragment element

---

### 9. populateSelectMenu
**Dependencies:** `createSelectOptions`

Populates the select menu with user options.

**Parameters:**
- `users` (array) - Users JSON data

**Implementation:**
- Select the `#selectMenu` element by id
- Pass users data to `createSelectOptions()`
- Receive an array of option elements
- Loop through options and append each to the select menu
- Return the `selectMenu` element

---

## Section 4: Async API Functions
*Use Async/Await to request data from JSONPlaceholder API*

### 10. getUsers
Fetches all users from the API.

**Implementation:**
- Should be an async function
- Use try/catch block
- Fetch from: https://jsonplaceholder.typicode.com/users
- Await the response
- Return the JSON data

---

### 11. getUserPosts
Fetches all posts for a specific user.

**Parameters:**
- `userId` (number) - The user ID

**Implementation:**
- Should be an async function
- Use try/catch block
- Fetch from: https://jsonplaceholder.typicode.com/posts?userId={userId}
- Await the response
- Return the JSON data

---

### 12. getUser
Fetches data for a specific user.

**Parameters:**
- `userId` (number) - The user ID

**Implementation:**
- Should be an async function
- Use try/catch block
- Fetch from: https://jsonplaceholder.typicode.com/users/{userId}
- Await the response
- Return the JSON data

---

### 13. getPostComments
Fetches all comments for a specific post.

**Parameters:**
- `postId` (number) - The post ID

**Implementation:**
- Should be an async function
- Use try/catch block
- Fetch from: https://jsonplaceholder.typicode.com/comments?postId={postId}
- Await the response
- Return the JSON data

---

## Section 5: Async Display Functions
*Depend on async API functions*

### 14. displayComments
**Dependencies:** `getPostComments`, `createComments`

Creates and returns a section element with comments.

**Parameters:**
- `postId` (number) - The post ID

**Implementation:**
- Should be an async function
- Create a section element with `document.createElement()`
- Set `section.dataset.postId` attribute
- Add classes `'comments'` and `'hide'` to the section
- Create variable: `comments = await getPostComments(postId)`
- Create variable: `fragment = createComments(comments)`
- Append fragment to section
- Return the section element

---

### 15. createPosts
**Dependencies:** `createElemWithText`, `getUser`, `displayComments`

Creates post elements from JSON data.

**Parameters:**
- `posts` (array) - Posts JSON data

**Implementation:**
- Should be an async function
- Create a fragment with `document.createDocumentFragment()`
- Loop through posts data
- For each post:
    - Create an article element
    - Create an h2 with the post title
    - Create a paragraph with the post body
    - Create a paragraph with `\`Post ID: ${post.id}\``
    - Define: `author = await getUser(post.userId)`
    - Create a paragraph with `\`Author: ${author.name} with ${author.company.name}\``
    - Create a paragraph with author's company catch phrase
    - Create a button with text `'Show Comments'`
    - Set `button.dataset.postId = post.id`
    - Create: `section = await displayComments(post.id)`
    - Append h2, paragraphs, button, and section to article
    - Append article to fragment
- Return the fragment element

---

### 16. displayPosts
**Dependencies:** `createPosts`, `createElemWithText`

Displays posts in the main element.

**Parameters:**
- `posts` (array) - Posts data

**Implementation:**
- Should be an async function
- Select the main element
- Define `element` variable:
    - If posts exist: `element = await createPosts(posts)`
    - If posts don't exist: create default paragraph (identical to HTML file)
    - *Suggestion: Use a ternary operator*
- Append element to main element
- Return the element variable

---

## Section 6: Procedural Functions
*Coordinate other functions in proper sequence*

### 17. toggleComments
**Dependencies:** `toggleCommentSection`, `toggleCommentButton`

Handles comment toggle functionality.

**Parameters:**
- `event` (Event) - The click event
- `postId` (number) - The post ID

**Implementation:**
- Set `event.target.listener = true` (required for testing)
- Pass `postId` to `toggleCommentSection()`
- Store the returned section element
- Pass `postId` to `toggleCommentButton()`
- Store the returned button element
- Return `[section, button]`

---

### 18. refreshPosts
**Dependencies:** `removeButtonListeners`, `deleteChildElements`, `displayPosts`, `addButtonListeners`

Refreshes the posts display with new data.

**Parameters:**
- `posts` (array) - Posts JSON data

**Implementation:**
- Should be an async function
- Call `removeButtonListeners()`
- Store the returned buttons
- Call `deleteChildElements(main)`
- Store the returned main element
- Call `await displayPosts(posts)`
- Store the returned fragment
- Call `addButtonListeners()`
- Store the returned buttons
- Return `[removeButtons, main, fragment, addButtons]`

---

### 19. selectMenuChangeEventHandler
**Dependencies:** `getUserPosts`, `refreshPosts`

Handles select menu change events.

**Parameters:**
- `event` (Event) - Automatically received

**Implementation:**
- Should be an async function
- Disable the select menu (`disabled` property)
- Define: `userId = event.target.value || 1`
- Pass `userId` to `await getUserPosts(userId)`
- Store the returned posts data
- Pass posts to `await refreshPosts(posts)`
- Store the returned `refreshPostsArray`
- Enable the select menu
- Return `[userId, posts, refreshPostsArray]`

---

### 20. initPage
**Dependencies:** `getUsers`, `populateSelectMenu`

Initializes the page on load.

**Implementation:**
- Should be an async function
- No parameters
- Call `await getUsers()`
- Store the returned users data
- Pass users to `populateSelectMenu(users)`
- Store the returned select element
- Return `[users, select]`

---

### 21. initApp
**Dependencies:** `initPage`, `selectMenuChangeEventHandler`

Initializes the application.

**Implementation:**
- Call `initPage()`
- Select the `#selectMenu` element by id
- Add event listener to `#selectMenu` for the `"change"` event
- Event listener should call `selectMenuChangeEventHandler`
- Does not return anything

---

## Final Step: Start the Application

Add this code after the `initApp` definition:

```javascript
document.addEventListener("DOMContentLoaded", initApp);
```

This listens for the `"DOMContentLoaded"` event and calls `initApp` to start the application.

---

## Testing Resources

- **Test Users Data:** https://jsonplaceholder.typicode.com/users
- **API Base URL:** https://jsonplaceholder.typicode.com/

## API Routes Reference

- Users: `/users`
- User by ID: `/users/{id}`
- Posts by User: `/posts?userId={userId}`
- Comments by Post: `/comments?postId={postId}`