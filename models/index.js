const db = require('../db');

const AssetModel = require('./asset');
const UserModel = require('./user');
const ProposalModel = require('./proposal');
const VoteModel = require('./vote');

UserModel.hasMany(ProposalModel);
UserModel.hasMany(VoteModel);

ProposalModel.belongsTo(UserModel);
ProposalModel.hasMany(VoteModel);

VoteModel.belongsTo(ProposalModel);

module.exports = {
    dbConnection: db,
    models: {
        AssetModel,
        UserModel,
        ProposalModel,
        VoteModel
    }
};