export default function paginatedResponse(model) {
  return async (req, res, next) => {
    const pageNo = parseInt(req.query.pageNo);
    const pageSize = parseInt(req.query.pageSize);

    if (pageNo < 0 || pageNo === 0) {
      return res.status(400).json({
        message: 'Invalid page number, should start with 1.',
      });
    }

    const startPosition = (pageNo - 1) * pageSize;
    const endPosition = pageNo * pageSize;
    const totalCount = await model.estimatedDocumentCount().exec();
    const totalPages = Math.ceil(totalCount / pageSize);

    const results = {};

    if (endPosition < totalCount) {
      results.nextPage = {
        pageNo: pageNo + 1,
        pageSize: pageSize,
      };
    }

    if (startPosition > 0) {
      results.previousPage = {
        pageNo: pageNo - 1,
        pageSize: pageSize,
      };
    }

    results.totalPages = totalPages;
    results.totalCount = totalCount;

    try {
      results.data = await model
        .find()
        .limit(pageSize)
        .skip(startPosition)
        .exec();

      res.paginatedData = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}
