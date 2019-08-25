**Budget App is a tool to help log one's expenses under certain categories.**

Check out the app! https://budget-app-daniel-pan.herokuapp.com/

*NOTE* Meant as a web application, untested on mobile.
Known Issues: Mutations do not refetch correct on Mobile Safari.
Found a bug? Let me know! Always willing to learn more by fixing mistakes!

## Budget App uses the following technologies:

### BackEnd: 

- Engine: Nodejs
- Server:  Express
- ORM: Sequelize
- Database: Postgres
- REST Alternative: Apollo Graphql
    - Instead of interation between a client and server via endpoints, graphql uses a single endpoint for all 	requests. Endpoints are replaced with queries and mutations. Queries GET information from the database whereas mutations, POST to the database. 
 - Test Frameworks: Mocha + Chai

### FrontEnd: 

- Main Frontend Framework: Vuejs
- State Management: Vuex + Apollo Client
- Style Framework: Vuetify



### Demonstrates basic CRUD Functionality with authentication.

#### Signup
![Signup](https://user-images.githubusercontent.com/20826907/59998658-d646fe80-9614-11e9-9a05-0b7cc42277c7.gif)

#### Login
![Login](https://user-images.githubusercontent.com/20826907/59998699-eeb71900-9614-11e9-8bdc-afe36fb39b0c.gif)

#### Create a Category
![AddCategory](https://user-images.githubusercontent.com/20826907/59998965-97657880-9615-11e9-881f-275bbd8ebe29.gif)

#### Edit a Category
![EditCategory](https://user-images.githubusercontent.com/20826907/59998697-eeb71900-9614-11e9-84f0-30bff22cf20d.gif)

#### Create an Expense
![AddExpense](https://user-images.githubusercontent.com/20826907/59999051-d7c4f680-9615-11e9-9104-c9bb2226b5fa.gif)

#### Edit an Expense
![EditExpense](https://user-images.githubusercontent.com/20826907/59999237-57eb5c00-9616-11e9-9ca5-ed3d77eeeddf.gif)

#### Delete an Expense
![DeleteExpense](https://user-images.githubusercontent.com/20826907/59999317-89fcbe00-9616-11e9-9a18-8d37870d89db.gif)

#### Sorting/Filtering Tables
![FilteringAndSorting](https://user-images.githubusercontent.com/20826907/59999414-c16b6a80-9616-11e9-8b73-a9454f9d19d3.gif)

#### Logout
![Logout](https://user-images.githubusercontent.com/20826907/59999450-db0cb200-9616-11e9-999e-38ea5c6ba383.gif)
