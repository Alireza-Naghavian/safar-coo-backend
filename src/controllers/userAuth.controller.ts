const Controller = require("./controller");

class userAuthController extends Controller {
  constructor() {
    super();
  }
}

module.exports = {
  userAuthController: new userAuthController(),
};
