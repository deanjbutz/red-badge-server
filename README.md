Dean's Investment Club Server

This server is built to host the data of users, assets, proposals, and votes for Dean's Investment Club App.

The user table consists of:

    First Name (fName)
    Last Name (lName)
    Email (email)
    User Title (title)
    User Role (role)
    Encrypted Password (password)

The asset table consists of:

    Asset Name (asset)
    Quantity (quantity)
    Value (value)

The proposal table consists of:

    Ticker 1 (ticker1)
    Quantity 1 (quantity1)
    Value 1 (value1)
    Ticker 2 (ticker2)
    Quantity 2 (quantity2)
    Value 2 (value2)
    Ticker 3 (ticker3)
    Quantity 3 (quantity3)
    Value 3 (value3)
    User ID (userId)
    First Name (fName)
    Last Name (lName)

The vote table consists of:

    Vote (vote)
    Comment (comment)
    User ID (userId)
    Proposal ID (proposalId)
    First Name (fName)
    Last Name (lName)

Users may have multiple proposals and multiple votes.
Proposals may have multiple votes.
