const router = require("express").Router()
const { models } = require("../models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { UniqueConstraintError } = require('sequelize/dist')

router.get('/', async (req,res) => {
    try {
        const users = await models.UserModel.findAll();
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({
            message: `Failed to get users. Error: ${err}.`
        })
    }
})

router.put('/:id', async (req, res) => {
    const { fName, lName, email, title, role } = req.body;
    const { id } = req.params;
    const query = { where: { id: id } };
    const updatedUser = { fName, lName, email, title, role }
    try {
        const update = await models.UserModel.update(updatedUser, query);
        if (update > 0) {
            res.status(202).json({ message: `${updatedUser.fName} updated successfully.`})
        } else {
            res.status(500).json({ message: `Failed to update ${updatedUser.fName}`})
        }
    } catch (err) {
        res.status(500).json({ message: `Failed to update user. Error: ${err}.`})
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = { where: { id: id } };
        const result = await models.UserModel.destroy(query);
        if (result) {
            res.status(200).json({ message: `User successfully deleted.` })
        } else {
            res.status(400).json({ message: `Failed to delete user.` })
        }
    } catch (err) {
        res.status(500).json({ message: `Failed to delete user. Error: ${err}.` })
    }
});

router.post("/register", async (req, res) => {

    const { fName, lName, email, title, role, password, groupCode } = req.body

    if (groupCode === process.env.GROUP_CODE) {
        try {
            const newUser = await models.UserModel.create({
                fName,
                lName,
                email,
                title,
                role,
                password: bcrypt.hashSync(password, 10),
            })
    
            const token = jwt.sign({
                id: newUser.id,
                role: newUser.role,
                fName: newUser.fName,
                lName: newUser.lName
            },
                process.env.JWT_SECRET,
                {
                    expiresIn: 60 * 60 * 24,
                })
    
            res.status(201).json({
                message: `Registration successful. Welcome, ${newUser.fName}.`,
                user: newUser,
                token: `Bearer ${token}`
            })
        } catch (err) {
            if (err instanceof UniqueConstraintError) {
                res.status(409).json({
                    message: "Oops! Looks like you are already registered! Please login."
                })
            } else {
                res.status(500).json({
                    message: `Registration failed. Error: ${err}`
                })
            }
        }
    } else {
        res.status(500).json({
            message: 'Group code incorrect. Please try again.'
        })
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const loginUser = await models.UserModel.findOne({
            where: { email }
        });

        if (loginUser) {

            let passwordComparison = await bcrypt.compare(password, loginUser.password);

            if (passwordComparison) {

                let token = jwt.sign({ 
                    id: loginUser.id,
                    role: loginUser.role, 
                    fName: loginUser.fName,
                    lName: loginUser.lName
                }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

                res.status(200).json({
                    user: loginUser,
                    message: `Welcome back, ${loginUser.fName}.`,
                    token: `Bearer ${token}`
                });
            } else {
                res.status(401).json({
                    message: "Incorrect email or password. Please try again."
                })
            }
        } else {
            res.status(401).json({
                message: "Incorrect email or password. Please try again."
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Login failed. Error: ${err}`
        })
    }
});

module.exports = router