exports.getGame = async (req, res, next) => {
  res.status(200).json({
    message: 'Hello Game'
  });
}