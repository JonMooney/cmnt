const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, (req, res) => {
    Comment.findAll({
        attributes: [
            // DO NOT INCLUDE ID IN HERE OR BREAKS
            'comment_text',
            'user_id',
            'topic_id',
            'created_at'
        ],
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        topic_id: req.body.topic_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err =>{
          console.log(err);
          res.status(400).json(err);
      })
});

// api/comments/5
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
