exports.list = function (req, res, next) {
	 res.render('pos-list', {
        title: "产品列表页",
      });
};

exports.detail = function (req, res, next) {
	 res.render('pos-detail', {
        title: "产品详情页",
      });
};