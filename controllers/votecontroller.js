const router = require('express').Router();
const validateJWT = require('../middleware/validate-jwt');
const { models } = require('../models');

router.get('/', async (req, res) => {
    try {
        const votes = await models.VoteModel.findAll({order: [['createdAt', 'ASC']]});
        res.status(200).json(votes)
    } catch (err) {
        res.status(500).json({
            message: `Failed to get votes. Error: ${err}.`
        })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = { where: { proposalId: id } };
        const votes = await models.VoteModel.findAll(query);
        if (votes) {
            res.status(200).json(votes)
        } else {
            res.status(204).json({ message: `No votes found.` })
        }
    } catch (err) {
        res.status(500).json({ message: `Failed to get votes. Error: ${err}.`})
    }
});

router.post('/', validateJWT, async (req, res) => {
    const { vote, comment, proposalId } = req.body;
    try {
        await models.VoteModel.create({
            vote: vote,
            comment: comment,
            proposalId: proposalId, 
            userId: req.user.id,
            fName: req.user.fName,
            lName: req.user.lName
        })
        .then(
            vote => {
                res.status(201).json({
                    message: `Vote successfully created`
                })
            }
        )
    } catch (err) {
        res.status(500).json({
            message: `Failed to create vote. Error: ${err}.`
        })
    }
});

router.put('/:id', validateJWT, async (req, res) => {
    const { vote, comment } = req.body;
    const { id } = req.params;
    const query = { 
        where: {
            id: id,
            userId: req.user.id
        }}
    const updatedVote = { vote, comment };
    try {
        const update = await models.VoteModel.update(updatedVote, query);
        if (update > 0) {
            res.status(202).json({ message: `Vote updated successfully.` })
        } else {
            res.status(500).json({ message: `Failed to update vote.` })
        }
    } catch (err) {
        res.status(500).json({ message: `Failed to updated vote. Error: ${err}.`})
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = { where: { proposalId: id } };
        const result = await models.VoteModel.destroy(query);
        if (result) {
            res.status(200).json({ message: `Votes deleted successfully.`})
        } else {
            res.status(400).json({ message: `Failed to delete votes.` })
        }
    } catch (err) {
        res.status(500).json({ message: `Failed to delete votes. Error: ${err}.`})
    }
});

router.delete('/vote/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = { where: { id: id } };
        const result = await models.VoteModel.destroy(query);
        if (result) {
            res.status(200).json({ message: `Vote deleted successfully.`})
        } else {
            res.status(400).json({ message: `Failed to delete vote.` })
        }
    } catch (err) {
        res.status(500).json({ message: `Failed to delete vote. Error: ${err}.`})
    }
});

module.exports = router;