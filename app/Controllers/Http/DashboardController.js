'use strict'

const Post = use('App/Models/Post')

class DashboardController {
  async index({ view, auth }) {
    const user = auth.user.toJSON()
    const posts = await Post.all()

    return view.render('dashboard', { user: user, posts: posts.rows })
  }

  create({ request, response, view }) {
    return view.render('post.create')
  }

  async store({ request, response, view, session }) {
    const post = new Post()

    post.title = request.input('title')
    post.content = request.input('content')
    await post.save()

    session.flash({ notification: 'Data Berhasil Disimpan!' })
    return response.route('dashboard')

  }

  async edit({ request, response, view, params }) {
    const id = params.id
    const post = await Post.find(id)

    return view.render('post.edit', { post: post })
  }

  async update({ request, response, view, params, session }) {
    const id = params.id
    const post = await Post.find(id)

    post.title = request.input('title')
    post.content = request.input('content')
    await post.save()

    session.flash({ notification: 'Data Berhasil Diupdate!' })
    return response.route('dashboard')
  }

  async delete({ request, response, view, params, session }) {
    const id = params.id
    const post = await Post.find(id)
    await post.delete()

    session.flash({ notification: 'Data Berhasil Dihapus!' })
    return response.route('dashboard')
  }
}

module.exports = DashboardController
