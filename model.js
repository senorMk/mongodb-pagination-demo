import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: 'String',
  },
  lastName: {
    type: 'String',
  },
});

let User = mongoose.model('User', UserSchema);

User.getAll = async (req, res) => {
  const pageNo = parseInt(req.query.pageNo);
  const pageSize = parseInt(req.query.pageSize);
  let query = {};

  if (pageNo < 0 || pageNo === 0) {
    return res.status(401).json({
      message: 'invalid page number, should start with 1',
      error: true,
    });
  }
  query.skip = (pageNo - 1) * pageSize;
  query.limit = pageSize;

  const totalCount = await User.estimatedDocumentCount().exec();

  const data = await User.find({}, {}, query).exec();

  let totalPages = Math.ceil(totalCount / pageSize);

  return res.status(200).json({
    pages: totalPages,
    count: totalCount,
    data: data,
  });
};

export default User;
