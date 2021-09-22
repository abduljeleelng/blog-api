
<img src="icon.png" align="right" />

# Blog API [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/abduljeleelng/blog-api#readme)
> Blog API services, 
# Technologu used
*  Nodejs, 
* Express, 
* MySQL 
* Sequelise ORM 
* Sequelise-cli e.t.c

Basic guide to use the App.

## Installation

Use need [NodeJS](https://nodejs.org/) to use this, clone the repo and install the dependencies.
```bash
git clone https://github.com/abduljeleelng/blog-api.git
```
Install the dependencies 

```bash
npm i
```
# set your environmental variable 
```bash
# create .env fil, 
# copy data in .env.example to .env file created
# set the values for the variables
```
> Database services configuration 
```bash
# create Database if not exist 
npm run db:create
# Drop database services 
npm run db:drop
# Run migration 
npm run db:migration 
# Seed demo data 
npm run db:seed
```

Run the development version of the App 

```bash
npm run dev
```

Rebuild documentation

```bash
npm run docs
```

Run Automated test 

```
npm run test
```

Start the application in production

```bash
npm start
```

## Live Endpoint 
[Blog API SERVICES](https://abduljeleelng-blog-api.herokuapp.com/)

## Documentation
[Documentation](https://abduljeleelng-blog-api.herokuapp.com/)

## Todo 
> acount activation

* Auto disable account, until account is activated 
* send activation code to the user email to activate account 

> Forget Password
* send the reset token to the user email

> Reset Passsword
* reset password via the token send to the email


## Contact Me
[Abduljeleel Yusuff](mailto:abduljeleelng@gmail.com) <br />
email : abduljeleelng@gmail.com