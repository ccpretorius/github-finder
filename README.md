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

### GET request

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

### Loading STATE

- The GET result should be updating state that will be reflected inside the return result every time the page loads
- With this just create a load state as well
- when the data returns use it to update the user state, which you can then reflect in the return statement with a list
- Set a check for your loading as well to show "Loading..." while it is waiting to load and move your return code inside this if statement
- Section 9: Video 50

### SPINNER
