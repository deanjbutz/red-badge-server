const router = require('express').Router();
const { models } = require('../models');
const validateJWT = require('../middleware/validate-jwt');

router.get('/', async (req, res) => {
    try {
        const proposals = await models.ProposalModel.findAll();
        res.status(200).json(proposals)
    } catch (err) {
        res.status(500).json({
            message: `Failed to get proposals. Error: ${err}.`
        })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const proposal = await models.ProposalModel.findOne({ where: {id:id}});
        res.status(200).json(proposal)
    } catch (err) {
        res.status(500).json({
            message: `Failed to get proposal. Error: ${err}.`
        })
    }
})

router.post('/', validateJWT, async (req, res) => {
    const {
        status,
        ticker1,
        quantity1,
        value1,
        ticker2,
        quantity2,
        value2,
        ticker3,
        quantity3,
        value3
    } = req.body;
    try {
        await models.ProposalModel.create({
            status: status,
            ticker1: ticker1,
            quantity1: quantity1,
            value1: value1,
            ticker2: ticker2,
            quantity2: quantity2,
            value2: value2,
            ticker3: ticker3,
            quantity3: quantity3,
            value3: value3,
            userId: req.user.id
        })
        .then(
            post => {
                res.status(201).json({
                    message: `Proposal created successfully.`
                })
            }
        )
    } catch (err) {
        res.status(500).json({ message: `Failed to create proposal. Error: ${err}.`})
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = { where: { id: id } };
        const result = await models.ProposalModel.destroy(query);
        if (result) {
            res.status(200).json({ message: `Proposal successfully deleted.` })
        } else {
            res.status(400).json({ message: `Failed to delete proposal.` })
        }
    } catch (err) {
        res.status(500).json({ message: `Failed to delete proposal. Error: ${err}.`})
    }
});

module.exports = router;