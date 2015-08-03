
exports.index = function (req, res, next) {
	 res.render('index', {
        title: "全国POS机收单机构",
      });
}