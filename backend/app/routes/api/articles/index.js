/**
 *
 * router for /api/artcicles
 *
 */

const express = require('express')
const router = express.Router()
const articleController = require('../../../controllers/articleController')

router.post('/', articleController.doPostArticle)
router.get('/list', articleController.doGetList)
router.get('/:id', articleController.doGetArticleById)
router.put('/:id', articleController.doPutArticle)
router.post('/:id/comment', articleController.doPostCommentById)
router.put('/:id/vote', articleController.doVoteById)
module.exports = router

