'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
/**
 * Register
 */
Route.get('register', 'Auth/RegisterController.index').as('register.index').middleware(['RedirectIfAuthenticated'])
Route.post('register', 'Auth/RegisterController.store').as('register.store').middleware(['RedirectIfAuthenticated'])
/**
 * Login
 */
Route.get('login', 'Auth/LoginController.index').as('login.index').middleware(['RedirectIfAuthenticated'])
Route.post('login', 'Auth/LoginController.check').as('login.check').middleware(['RedirectIfAuthenticated'])
Route.get('logout', 'Auth/LoginController.logout').as('logout').middleware(['Authenticate'])
/**
 * Dashboard
 */
Route.get('dashboard', 'DashboardController.index').as('dashboard').middleware(['Authenticate'])
Route.get('dashboard/create', 'DashboardController.create').as('posts.create')
Route.post('dashboard/store', 'DashboardController.store').as('posts.store')
Route.get('dashboard/edit/:id', 'DashboardController.edit').as('posts.edit')
Route.post('dashboard/update/:id', 'DashboardController.update').as('posts.update')
Route.get('dashboard/delete/:id', 'DashboardController.delete').as('posts.delete')
