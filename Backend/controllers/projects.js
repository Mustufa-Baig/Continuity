const projectsRouter = require('express').Router()
const mongoose = require('mongoose')

const { userExtractor } = require('../utils/middleware')
const Project = require('../models/project')
const User = require('../models/user')

projectsRouter.get('/', userExtractor , async (request, response) => {
  try {
    const user = await User.findById(request.user)

    if (!user) {
      return response.status(400).json({ error: 'userId missing or not valid' })
    }


    const populated_user = await user.populate('projects', { title: 1 , createdAt: 1 })
      
    const projects = populated_user.projects.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    )
    response.json(projects)

  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'Failed to fetch projects' })
  }
})

projectsRouter.get('/entries', userExtractor , async (request, response) => {
  try {
    const user = await User.findById(request.user)
    const { project_id } = request.body

    if (!user) {
      return response.status(400).json({ error: 'userId missing or not valid' })
    }

    if (!project_id) {
      return response.status(400).json({ error: 'project_id missing' })
    }

    const project = await Project.findById(project_id)

    if (!project) {
      return response.status(400).json({ error: 'project missing or not valid id' })
    }

    const result = await project
      .populate([
      {
        path: 'entries',
        select: 'content user',
        populate: {
          path: 'user',
          select: 'username name'
        }
      },
      {
        path: 'users', 
        select: 'username name'
      }])

    if (result?.users?.some(obj => obj.username === user.username)){
      return response.json(result)
    }
    return response.status(401).json({ error: 'project does not belong to user' })

  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'Failed to fetch projects' })
  }
})

projectsRouter.post('/', userExtractor , async (request, response, next) => {
  try {
    const { title } = request.body
    const user = await User.findById(request.user)
    
    if (!user) {
      return response.status(400).json({ error: 'userId missing or not valid' })
    }

    const project = new Project({
      title: title,
      users: [user._id]
    })

    const savedProject = await project.save()
    await savedProject.populate('users', {username: 1, name : 1 })

    user.projects = user.projects.concat(savedProject.id)
    await user.save()

    response.status(201).json(savedProject)
  } catch (error) { next(error) }
})



module.exports = projectsRouter