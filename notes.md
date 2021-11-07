Review of Back-End (Week 4: November 1—5)

Node + Express
Node – Server-side environment that can handle logic written in JavaScript (allows JS to be run on a server) So you can use JS for BOTH the front-end and the back-end.

Key Topics:
1)	Node
2)	NPM
3)	Modules
4)	Nodemon

Installation Process

1.	Install  npm (node package manager): npm install -g npm
2.	Initialize node environment inside of a directory: npm init (to specify attributes)
Otherwise, run npm init -y to set up using default values (index.js as the entry point for node)
3.	Create your entry point: touch index.js
4.	Create your .gitignore file to list “node_modules” to load everything to github except the node_modules. (When you fork and clone a repo with dependencies, simply run npm i and this will look at the package.json and install all listed dependencies. Avoids creating unnecessarily large repos)

Node Modules
1.	The beauty of Node is that you can import modules (specialized code written by others) to solve things in your projects.
Modules are imported into your projects using the require() method and their functionality is stored in a variable as an object so you can use object notation to access the functionality.
2.	There are 3 types of Modules:
a.	Core Modules (aka built-in modules) include bare minimum functionalities of Node and load automatically when Node.js process starts. Simply import using require(‘module name’). (Important core modules include: http, url, querystring, path, fs, util)
b.	Local Modules (modules you create locally in your application – use module.exports and require(‘’) to export and import local modules)
c.	Third Party Modules – these are modules written by others encapsulated in a Node package made available by the npm centralized software registry.

Nodemon – package that makes developing node apps easier by restarting your application each time you save. (You can also set it up differently by adding nodemon in the start script of the package.json)

EXPRESS

-	JS framework for writing RESTful APIs in Node.
Steps to creating an express app in Node
1)	Create a directory and cd into it
2)	Initialize NPM – npm init -y (for default entry point of index.js (found in package.json)
a.	Automatically creates a package.json
b.	Package.json shows entry point, scripts, dependencies
3)	Install express – npm i express
a.	Automatically creates package-lock.json. This file tracks npm install history.
4)	Create entry point (default is index.js)  and .gitignore (to exclude “node_modules” from git push)
5)	Entry point: use require to import express into your repo.
a.	Const express = require(‘express’)
6)	Entry point: create an instance of the app by calling the method on express object
a.	Const app = express()
7)	Entry point: create a home route using app.get with a url pattern of ‘/’
8)	Entry point: call the listen method on app to listen on port #### (try: 8000)
9)	Run Nodemon

Routes

-	Route is a combination of a url pattern (what comes after the base url) and an HTTP verb
a.	Base URL is made up of https and a domain name “www.reddit.com”
-	4 main verbs:
a.	GET
b.	POST
c.	PUT
d.	DELETE
-	These map to CRUD actions: Create, Read, Update, Destroy (POST, GET, PUT, DELETE)

-	Anatomy of an Express Route:
a.	[express instance].[HTTP Verb]([url pattern], [callback function])
b.	Callback function takes two arguments
a.	The Request Object
b.	The Response Object

-	Anatomy of a Callback function:
a.	([request object], [response object]), {
//handle data here if needed
//call a method from the response objects
}
b.	The Request Object contains data from the user request
	Keys include: body which holds submitted form data!
	Params where special route variables are stored for us (for dynamism)
	Query where query string data is stored
c.	The response object is where we respond to the user request
a.	Res.send() – sends back a string
b.	Res.sendFile() – sends backa  static file
c.	Res.render() – renders data into templates with selected template engine
d.	Res.json() – sends object data back as JSON

-	The get() function of app is used to set up a GET route that
-	You can add parameters (js variables) in the url pattern by using the : These are accessible in the request params object. Req.params. (you can have more than one parameter in a url.
-	Query Strings: 
a.	Typically only included with GET requests as they are conventionally used to query data from some source. url/?key1=value1&key2=value2


VIEWS 

-	Instead of sending plain text using res.send(), we can send back a file using res.sendFile() that will respond to the user GET request with an html file.
-	These html files should live inside your VIEWS folder
-	Your url pattern should reflect the specific view url you want to visit
a.	Instead of using res.send() you use res.sendFile() 
b.	In the function call, include __dirname+’/views/index.html’
c.	__dirname is a Node keyword that gives us the absolute path of the current directory, so we can just tack on the relative path of the file we want to send.


TEMPLATES

-	The issue with res.sendFile() is that we are sending a static page. But, we want our page to be dynamic and responsive to user input and customization…so, we have another response method called render(). By using template engines, we can inject values into HTML and JS logic into HTML files. The package that we use for this is EJS  or Embedded Javascript
-	Steps:
1)	Install EJS – npm i ejs
2)	Set view engine to ejs – app.set(‘view engine’, ‘ejs’)
a.	This tells express that we are using ejs as the view engine (can read ejs syntax)
3)	Render method will refer to ejs files. (can use name only…view engine knows it’s looking for ejs.)
4)	EJS Syntax
a.	<%= %> to render
b.	<%- %> for partials (modularize views and reduce repetition. (common pattern is to move the header and footer of a page into separate views, then render them on each page by creating a partials folder that includes ejs files. And include them in your index.ejs by using <%- include(‘../partials/header.ejs’) %>
c.	<% %> to just include variable in the back end without rendering


LAYOUTS and CONTROLLERS

-	Partials can DRY up code a bit but EJS Layouts can make it even more modular, which is especially important for larger applications.
-	EJS Layouts is a node package  that allows us to create a boilerplate (aka layout) that we can inject content into based on which route is reached. 
-	Install express, ejs, and express-ejs-layouts
a.	For ejs, set the view engine as ejs (this allows to use ejs syntax in html.
b.	For express-ejs-layouts…app.use(ejsLayouts)
-	App.use() is an express function that indicates Middleware
a.	Middleware functions intercepts the request object when it comes in from a client but before it hits any route.
-	Creating a layout
a.	In root of views, create a layout.ejs (express-ejs-layouts MANDATES it be called layout.ejs)
b.	Set html boilerplate and in body, include body partial: <%- body %>
c.	This layout will be used by all pages and the content of each unique page will be filled where the above body partial is used. This body partial is MANDATED by express-ejs-layouts
d.	Create a home.ejs file in views folder
e.	Use GET to establish a home route with url pattern (‘/’) and filename home.

Controllers and Express Router

-	If you have several views/routes to those views, it’s best to categorize them (modularize) and store them in (VIEWS) ejs files in separate folders within Views and (ROUTES) JS files in a controllers folder. (Instead of having all of the routes in the index.ejs, you can now have them by category in JS files in your controllers folder. All routes go in here except for your home route, which stays in the index.js.
-	This requires you to edit your url patters to start with the folder within the views folder that you created to store each category’s views.
-	Because you are moving your routes out of index.js and into a cotrollers folder…you need to have a way for Express to find them and route them. So, we have the Router() that helps us wrap these routes into a Module that we’ll export back into our main index.js file.
-	Router() set up
1)	In your controller files, import express and get variable router with express.Router()
2)	Change routes from app to router
3)	Module.exports = router
4)	Back in index.js, use middleware app.use(‘/loveit’, require(‘./controllers/loveit’
	This says that if you get url pattern that says ‘/loveit’ go into the controller file
	Called loveit to find the relevant routes. SINCE you are telling express what
	Controller file to look at, you don’t need the prepend of filename in the route url 
	Pattern.


CRUD & REST

-	CRUD – Create Read Update Delete
-	RESTful routing is the combination of a URL pattern and an HTTP verb so that  you not only tell the browser where you want to go but what you want to DO.
-	REST – Representational State Transfer maps HTTP Verbs GET,PUT,POST,DELETE to CRUD actions together.
a.	STATE transfer? When you are clicking on links in a website you are transitioning between different states of the application.
b.	RESTful route incorporates
1.	The item or data you’re interacting with
2.	The CRUD action you are performing on THAT item or data
-	NOTE: With all PUT, POST, and DELETE routes, you HAVE TO  redirect to a GET page.
-	NOTE: To create (POST) or update (PUT), you first need to GET the forms that you will be acting on.
-	Dinosaurs sample
1)	Created a pseudo database using a JSON file with data
2)	To access this, we will use a core module, fs – filesystem
3)	You need to parse the JSON because it is in JSON format.
4)	To pass data, you need to use the render method in the response, reference the views folder and item, and pass the data as an object. (Note: if the key and value names are the same, you can omit the : and write the name once)
5)	NOTE the name of your key in the object you are passing needs to match the name of the variable you are using in your respective view!
6)	Show routes are simply GET / READ routes
7)	New / Read (GET) route
a.	GET is less secure than POST because it sends data as part of the url so it is visible to everyone. POST is safer because parameters are not stored in the browser history or in 
b.	To create a data point, you need to get the data from a form and use POST

c.	FORM DATA
1)	Forms take two attributes:
2)	METHOD: This is the HTTP Verb
3)	ACTION: url pattern associated with the route that will handle the data
4)	Forms take a:
1)	Label (for attribute must match id of the input)
2)	Input with id (matches label, type, name (must match the key in the data)
3)	Input of type Submit (the button)
5)	 To Receive this data: you need to create a POST route and use middleware to make the data readable by using middleware body-parser: app.use(express.urlencoded({extended: false})) This tells body-parser to capture urlencoded data (form data) and store it in req.body the extended portion ensures the values will either be in strings or arrays.
6)	Now you can access the data using req.body in a post method.
7)	Now you could read the JSON file, push the new animal to the object, and write the new JSON file using the fs method writeFileSync (to replace outdated JSON file)
a)	Read JSON and PARSE
b)	Push the req.body to the parsed object
c)	Fs.writeFIleSync(‘/json file’, stringified(json file))
d)	Stringify is the opposite of parse, it turns object into json data
e)	Redirect to base page
8)	If you wanted to filter: use a GET method and read the data via a query string!
9)	Form would have action of the base url where you want to GET data from and method is GET. for/id attributes must match and form name must match the field in the object.
10)	Store the query string, req.query.nameFilter in a variable and then use the filter on the array of parsed data to match with object keys. Then you can pass data using the object with the namefilter as the value.


-	PUT and DELETE

o	USE method-override to use PUT and DELETE because these two methods are not supported by HTML5.
o	Method-override  is a packaged that allows us to catch incoming requests to the back end and change the method. By default, it only overrides POST methods.
o	MO looks for a _method=DELETE or _method=PUT query string in the URL and swaps out the method accordingly.
(i)	Npm i method-override
(ii)	Const methodOverride = require(‘method-override’)
(iii)	App.use(methodOverride(‘_method’)
o	DELETE
	Contains no payload (req.body) and no query string (req.query) the only data is expressed via a URL parameter which matches the item’s name (req.params.name)
	Can only use POST methods to activate the method-override
	Use splice to remove element from array, save, redirect
	<form method="POST" action="/dinosaurs/<%= index %>/?_method=DELETE">
         <input type="submit" value="Delete">
    </form>
o	PUT
	Edit link to the dinosaurs index
	<a href="/dinosaurs/edit/<%= index %>">Edit</a>
      <form method="POST" action="/dinosaurs/<%= index     %>/?_method=DELETE">
          <input type="submit" value="Delete">
      </form>
	Create a form for editing the info and submitting the PUT request
•	<form method="POST" action="/dinosaurs/<%=dinoId%>/?_method=PUT">
	Set up a GET route
•	res.render('dinosaurs/edit', {dino: dinoData[req.params.idx], dinoId: req.params.idx});
	SET up our PUT route where you return the edited values through req.body
//re-assign the name and type fields of the dinosaur to be editted
  dinoData[req.params.idx].name = req.body.name;
  dinoData[req.params.idx].type = req.body.type;
   // save the editted dinosaurs to the data.json file
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
  res.redirect('/dinosaurs')


APIs with Express (request)
-	Application Program Interface
-	Send requests using the request Node module
-	Npm i –save request
-	Necessary steps
o	URL
o	Any other data or headers that need to be passed (optional)
o	Callback function (the code that runs once the request finishes)
	Checking for errors
	Checking the response code
	Handling the body of the response


APIs with Express (axios)
-	Npm i axios
-	Require axios in index.js
-	This api request using axios.get() will be a promise chain with .then to handle a successful response, .catch to handle an error and .finally to catchall (always executed) 
-	.catch and .finally are optional
-	The html that comes back inside the data field of the object. Like fetch, axios also has a wrapper it gives us in the response.
