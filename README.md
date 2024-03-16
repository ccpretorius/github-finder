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
