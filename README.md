# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Install Tailwindcss

- various elements from :
  [the tailwindcss site](https://tailwindcss.com/docs/guides/create-react-app)

## Install daisyUI

https://daisyui.com/docs/install/

plugins: [require('daisyui')],

## Cleanup installation files

1. Cleanout the contents of the <div></div> in App.js
2. Test a Tailwind class in place of the className in the div
<div className="bg-purple-500">
  <h1 className="text-xl">Hello World!</h1>
</div>

3. Test a DaisyUI class
<div className="bg-purple-500">
  <h1 className="text-xl">Hello World!</h1>
  <button className="btn">Click</button>
</div>

4. Clean up all the unncessary code if everything is working

- delete in App.js
  - all classNames
  - and the <h1></h1>
  - and the <button></button>
  - all imports
  - keep only index.css and index.js and App.js
  - get rid of reportWebVitals import and its function in index.js

Ready to go!

## Daisy Themes

- Select themes in the Theme menu item of daisyUI and activate it as suggested in:
  https://daisyui.com/docs/themes/
- insert into index.html as a className and add an export to tailwind.config
module.exports = {
//...
daisyui: {
themes: ["light", "dark", "cupcake"],
},
}
<html data-theme="cupcake"></html>

<<<<html lang="en" data-theme="dark">>>>
Dark theme is what we have for now.

# github-finder

## Create a Navbar

1. npm i react-router-dom react-icons
2. Create components subfolder structure
3. Inside components/layout create your Navbar.jsx
4. We will be using Links so we wil; use Router

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
return (
<Router>

<div>
<h1>Hello World!</h1>
</div>
</Router>
);
}

export default App;

- wrap everything with the Router
- You need to wrap in order to use the Link in the Navbar
function App() {
return (
<Router>
   <div>
     <Navbar />
     <main>Content</main>
   </div>
  </Router>
  );
}

Some classNames:
flex: This applies the CSS display: flex; property to the <div>, making it a flex container. This enables you to use the Flexbox layout model for laying out its child elements in a more efficient and predictable way than the traditional block model.

flex-col: This modifies the flex direction to flex-direction: column;. Instead of laying out child elements horizontally (the default behavior for flex containers), it lays them out vertically, from top to bottom.

justify-between: This applies the CSS property justify-content: space-between; to the flex container. It distributes the child elements evenly, with the first child aligned to the start and the last child aligned to the end of the container's main axis. In this case, because flex-col is used, the main axis is vertical, so it creates space between vertically stacked items.

h-screen: This sets the height of the <div> to be the full height of the viewport, using height: 100vh;. It ensures that the flex container takes up the entire height of the screen.

- NOTE: The appearance of elements like your "Navbar" and "Content" on the left side of the screen, even without specific container classes, is due to the default web document flow and the inherent behavior of block-level elements. These elements take up the available width, but their content starts from the left, adhering to the default text alignment and block formatting context. Without CSS rules to alter this behavior (such as text alignment, flexbox, grid, or specific margin/padding adjustments), the elements will appear as you've described.

## Navbar

1. Get some fonts, set a default title and set up some classes
   function Navbar(title) {
   return (
   <nav className="navbar mb-12 shadow-lg bg-neutral text-neutral-content">
   <div className="container mx-auto">Navbar</div>
   </nav>
   );
   }

Navbar.defaultProps = {
title: "Github Finder",
};

- NOTES ON STYLE CLASSES

navbar: This class comes from DaisyUI. It applies a set of styles specifically designed for navigation bars, making it easy to create a consistent and responsive navbar with minimal custom styling.

mb-12: This is a Tailwind CSS utility class that applies a margin-bottom of 3rem (48 pixels, since the default Tailwind CSS base font size is 16 pixels and 12 units in Tailwind's default spacing scale is equal to 3rem). This creates space between the navbar and the content that follows it.

shadow-lg: This Tailwind CSS utility class applies a large box shadow to the element, giving it a raised look and helping it stand out from the rest of the content. This is often used to add depth to UI components like navigation bars and cards.

bg-neutral: In Tailwind CSS with DaisyUI, bg-neutral applies a background color defined as "neutral" in the theme. DaisyUI extends Tailwind CSS with themeable design tokens, allowing for consistent color schemes across components. The "neutral" color is designed to be visually balanced and typically used for elements that require subtle emphasis.

text-neutral-content: This DaisyUI class sets the text color to an appropriate contrast color for content within elements that have the bg-neutral background color. It ensures that text is readable against the neutral background by selecting a color with sufficient contrast according to the theme's design tokens.

container defines the maximum width of your content and ensures it doesn't stretch too wide on large screens. It also ensures that the content area can adjust its width responsively based on the viewport size.
mx-auto ensures that this container is centered horizontally within its parent element (in this case, the <nav>).

## GITHUB REST API

https://docs.github.com/en/rest/using-the-rest-api/getting-started-with-the-rest-api?apiVersion=2022-11-28

- One can increase http request rates by going to settings in your profile and then developer settings and personel access tokens
- You can paste your token into the Beaarer token type under Authorisation to have increased rate limits
- Create an environment variable which is a variable that can be used anywhere inside the application
- create .env inside your root
  REACT_APP_GITHUB_URL = "https://api.github.com"
  REACT_APP_GITHUB_TOKEN = "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"
- The REACT_APP part is compulsory. The rest of the name is up to you
- if you are happy with the default rate limtes then you dont need to store the api varible inside your environment
- the url is not necessary as it is unlikely to change
- RESTART SERVER
- To test it use this anywhere in the site:
  {process.env.REACT_APP_GITHUB_TOKEN}

## SETTING UP FUNCTIONALITY

### HTTP GET REQUEST TO GET THE USERS

- Place your GET inside useEffect because you want to have the GET run on rendering of the page
- There is no dependancies becaue we want the function to run only once when the component loads
- Since we are going to use async await you cannot create the GET function inside the useEffect. You need to create the function outside useEffect and then call it inside useEffect
- We want the user results in the UserResults component so let's do the GET request there
- We will be using env variables so the arguments of the fetch function should be in backward tags ``. 
fetch(`${process.env.REACT_APP_GITHUB_URL}/users`)
- To pass the token it needs to be included as a second argument by way of the Authorisation Header
  const fetchUseers = async () => {
  const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
  headers: {
  Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
  },
  });
  };

  - Get yuor data back and convert it to a javascript object with the json() method
    const fetchUseers = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
    headers: {
    Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
    },
    });
    const data = await response.json();
    console.log(data);
    };

  return <div>USER RESULTS</div>;
  }

### LOADING STATE WITH THE USERS

- The GET result should be updating state that will be reflected inside the return result every time the page loads
- With this just create a load state as well
- when the data returns use it to update the user state, which you can then reflect in the return statement with a list
- Set a check for your loading as well to show "Loading..." while it is waiting to load and move your return code inside this if statement
- Section 9: Video 50

### ADD A SPINNER

### ADD A USERCOMPONENT TO REFLECT EACH USER

### CREATE A CONTEXT PROVIDER

1. First create your context folder where you can have different context providers and then a subfolder for each context you want to provide
2. Create a Cotext file for your first context provider. In this case it is GithubContext.js
3. You need to import createContext and then initiate your provider with it. Make sure it is exported.
4. Create your GithubContext.Provider and add the value object to it and export it
5. We are going to replace state mostly with Reducers, but to start just copy your state variables over to the Githubcontext file
6. Copy over your GET request
7. Add your provider to the file and export it
8. Now wrap the components that you want to make use of this context. This would be inside our App.jsx file
9. You need to import GithubProvider. Now you should have access to the data in the context
10.

### CREATE THE REDUCER

### CLEANING UP TO SET THE SEARCH FUNCTION

1. The fetchUsers function was only a placeholder for the search function. So comment this out now
2. Also set the loading in the initial state to true - this would now render a spinner if there is not FetchUsers function
3. So you need to remove the useEffect with the fetchUsers function inside it and useEffect import and the fetchUsers in the Reducer =? you now will have a blank screen rendered

### SETTING UP A USERSEARCH COMPONENT

1. Create the UserSearch component inside your Users inside components
2. Bring this into your Home page
3. Add some classes
4. Add the state for the form inputs
5. Add the tow-way binding for value={text} and onChange={handleChange} and create the hancleChange function that sets the state with setText(e.target.value)
6. Add the onSubmit functionality in your <form onSubmit={handleSubmit}></form> and create the handleSubmit function with basic validation

### SEARCH FUNCTIONALITY

1. Establish the structure of your endpoints so you can add a search parameter

- http://api.github.com/search/users?q=brad
- Replace the existing illustrative fetchUsers with searchUsers()

  - change function name
  - change the endpoint
  - create the params to feed your search and take in "text"

    const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
    q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
    headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
    },
    });

    //const data = await response.json();
    const { items } = await response.json();

    dispatch({
    type: "GET_USERS",
    payload: items,
    });
    };

  - Add { searchUsers } to UserSearch
  - Why use new URLSearchParams()

Using const params = { q: text }; directly in the context of building query strings for URLs is not inherently wrong, but it does not directly serve the purpose of easily appending parameters to a URL string. Here's a breakdown of why new URLSearchParams() is preferred in this context, especially for making API requests or dealing with URLs in general:

URL Encoding
URLSearchParams automatically handles URL encoding for the parameters. This means that special characters, spaces, and other entities that need to be encoded in URL parameters are correctly processed. For instance, if text includes spaces or symbols like &, URLSearchParams ensures these are properly encoded to %20, %26, etc., so that the URL remains valid.

Query String Building
URLSearchParams provides a convenient and intuitive API for building query strings. You can easily append multiple parameters, iterate over them, or even convert the entire set of parameters into a string suitable for URL queries. This abstraction saves you the manual work of concatenating strings and dealing with edge cases like the first parameter starting with a ? and subsequent parameters being appended with &.

Error Prone Manual Concatenation
If you were to manually build the query string using an object like const params = { q: text };, you'd need to iterate over the object's keys and values, ensure proper encoding, and concatenate them correctly into a query string. This process is error-prone and requires additional boilerplate code.

Example Illustration
Using an Object:

javascript
const params = { q: text };
let queryString = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
const response = await fetch(`${GITHUB_URL}/search/users?${queryString}`, { ... });
Using URLSearchParams:

javascript
const params = new URLSearchParams({ q: text });
const response = await fetch(`${GITHUB_URL}/search/users?${params}`, { ... });
As seen in the examples, URLSearchParams simplifies the process significantly. This is why it's generally preferred for tasks involving URL parameter manipulation. It ensures the query string is correctly formatted and encoded, reducing the potential for errors and making the code more readable and maintainable.

- NOTE: SO WHAT HAPPENNED HERE?
  To understand how the {text} value moves through your code and results in the rendering of user data, let's break down the flow, starting from when a user inputs text into the UserSearch component, all the way to when the UserResults component displays the users fetched from the GitHub API.

1. User Inputs Text
   In the UserSearch component, there is an input field where the user can type a search term. This is where {text} originates. As the user types, the handleChange function updates the text state with the current value of the input field.

2. Submitting the Form
   When the form is submitted by clicking the "Go" button, the handleSubmit function is called. This function first checks if the text state is not empty. If it's not, it calls searchUsers(text), passing the current value of text as an argument. This is how {text} is transferred to the searchUsers function in the GithubProvider.

3. Fetching User Data
   Inside searchUsers, {text} is used to construct a query URL for the GitHub API. This function sets the loading state to true by dispatching a SET_LOADING action, then makes an asynchronous request to the GitHub API, searching for users based on the {text} value. Upon receiving the response, it parses the JSON to extract the items array, which contains user data, and dispatches a GET_USERS action along with the items as the payload.

4. Updating the State
   The dispatched action is handled by the githubReducer, which updates the users state with the payload (the fetched user data) and sets the loading state to false. This is how the global state within GithubContext gets updated with the new user data.

5. Rendering User Data
   Finally, the UserResults component, which also consumes the GithubContext, reacts to the change in the global state. If the loading state is false, it maps over the users array in the state and renders a grid of UserItem components for each user, or a message if no avatar is available. If the loading state is true, it renders a Spinner component instead.

This flow enables dynamic searching and rendering of GitHub user data based on the text input by the user. The use of context and reducers helps manage and distribute the application's state efficiently, allowing for reactive updates to the UI based on user interactions and data fetches.

### ALERTS

1. Set up a folder for alert inside the context folder

- AlertContext.js
- AlertReducer.js

2. Setup the AlertContext

import { createContext, useReducer } from "react";
import alertReducer from "./AlertReducer";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
const initialState = null;
const [state, dispatch] = useReducer(alertReducer, initialState);

return (
<AlertContext.Provider value={{ alert: state }}>
{children}
</AlertContext.Provider>
)
};

export default AlertContext;

3. Wrap the App in the Provider
