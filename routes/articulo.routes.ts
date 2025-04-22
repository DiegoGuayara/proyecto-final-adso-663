import { Router } from "express";
import { ArticuloController } from "../controllers/articulo.controller";

const router = Router();
const articuloController = new ArticuloController();

router.post(
  "/createArticle",
  ArticuloController.addArticle.bind(articuloController)
);
router.get(
  "/obtArticles",
  ArticuloController.obtArticles.bind(articuloController)
);
router.get(
  "/obtArticles/:id",
  ArticuloController.obtArticlesId.bind(articuloController)
);
router.put(
  "/actArticles/:id",
  ArticuloController.updateArticle.bind(articuloController)
);
router.delete(
  "/delArticle/:id",
  ArticuloController.delArticle.bind(articuloController)
);

export default router;
