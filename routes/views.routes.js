const { createViewPage } = require("../helpers/create_view_page");
const DictionaryModel = require("../schemas/Dict")
const AuthModel = require("../schemas/Author")
const TopicModel = require("../schemas/Topic")

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render(createViewPage("index"), { title: "Asosiy sahifa", isHome: true });
});

router.get("/dictionary", async (req, res) => {
  const items = await DictionaryModel.find().lean();
  res.render(createViewPage("dictionary"), {
    title: "dict page",
    isDict: true,
    items,
  });
});

router.get("/authors", async (req, res) => {
  const items = await AuthModel.find().lean();
  res.render(createViewPage("authors"), {
    title: "author page",
    isAuthor: true,
    items,
  });
});

router.get("/topics", async (req, res) => {
    const items = await TopicModel.find().lean()
  res.render(createViewPage("topics"), {
    title: "Maqolalar sahifasi",
    isTopic: true,
    items,
  });
});

router.get("/login", (req, res) => {
  res.render(createViewPage("login"), {
    title: "Login sahifasi",
    isLogin: true,
  });
});

module.exports = router;
