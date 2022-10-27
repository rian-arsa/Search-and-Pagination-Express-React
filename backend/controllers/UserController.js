const { Op } = require("sequelize");
const User = require("../models/UserModel");

const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  const totalRows = await User.count({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: "%" + search + "%",
          },
        },
        [
          {
            email: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      ],
    },
  });
  const totalPage = Math.ceil(totalRows / limit);
  const result = await User.findAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: "%" + search + "%",
          },
        },
        [
          {
            email: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      ],
    },
    offset: offset,
    limit: limit,
    order: [["id", "DESC"]],
  });
  res.status(200).json({
    result,
    page,
    limit,
    totalRows,
    totalPage,
  });
};

module.exports = {
  getUsers,
};
