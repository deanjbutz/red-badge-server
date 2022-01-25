const router = require('express').Router();
const { models } = require('../models');
const validateJWT = require('../middleware/validate-jwt');

router.get('/', async (req, res) => {
    try {
        const assets = await models.AssetModel.findAll({order: [['asset', 'ASC']]});
        res.status(200).json(assets);
    } catch (err) {
        res.status(500).json({
            message: `Failed to get assets. Error: ${err}.`
        })
    }
});

router.post('/create', validateJWT, async (req, res) => {

    const { asset, quantity, value, datePurchased, dateSold } = req.body

    if (req.user.role === 'Admin') {
        try {
            const newAsset = await models.AssetModel.create({
                asset,
                quantity,
                value,
                datePurchased,
                dateSold
            })
            res.status(201).json({
                message: 'Asset created successfully'
            })
        } catch (err) {
            res.status(400).json({
                message: `Failed to create asset. Error: ${err}`
            })
        }
    } else {
        res.status(401).json({
            message: `Unauthorized.`
        })
    }
});

router.put('/:id', validateJWT, async (req, res) => {

    const { asset, quantity, value, datePurchased, dateSold } = req.body;
    const { id } = req.params;

    const query = {
        where: {
            id: id
        }
    };

    const updatedAsset = { asset, quantity, value, datePurchased, dateSold }

    if (req.user.role === 'Admin') {
        try {
            const update = await models.AssetModel.update(updatedAsset, query);
    
            if (update > 0) {
                res.status(202).json({
                    message: `${updatedAsset.asset} updated succesfully.`
                })
            } else {
                res.status(500).json({
                    message: `Failed to update ${updatedAsset.asset}.`
                })
            }
        } catch (err) {
            res.status(500).json({
                message: `Failed to update asset. Error: ${err}.`
            })
        }
    } else {
        res.status(401).json({
            message: `Unauthorized.`
        })
    }
});

router.delete('/:id', validateJWT, async (req, res) => {
    const { id } = req.params;
    if (req.user.role === 'Admin') {
        try {
            const query = {
                where: {
                    id: id
                }
            };
            const result = await models.AssetModel.destroy(query);
            if (result) {
                res.status(200).json({
                    message: `Asset successfully deleted.`
                })
            } else {
                res.status(400).json({
                    message: `Failed to delete asset.`
                })
            }
        } catch (err) {
            res.status(500).json({
                message: `Failed to delete asset. Error: ${err}.`
            })
        }
    } else {
        res.status(401).json({
            message: `Unauthorized.`
        })
    }
});

module.exports = router;