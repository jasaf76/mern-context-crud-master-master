import express from "express";
import nftControllers from "../controllers/nftControllers.js";

// const {getAllNfts,getSingleNFT,createNFT,updateNFT,deleteNFT} = require("./../controllers/nftControllers");

const router = express.Router();
//router.param("id", nftControllers.checkId);
//import NFT from "../models/nftModel.mjs";

///TOP 5 NFTs BY PRICE

router
  .route("/top-5-nfts")
  .get(nftControllers.aliasTopNFTs, nftControllers.getAllNfts);
// stats Route
router.route("/nfts-stats").get(nftControllers.getNFTsStats);
// Route get monthly plan

router.route("/monthly-plan/:year").get(nftControllers.getMonthlyPlan);
// ROUTER NFTs
router
  .route("/")
  .get(nftControllers.getAllNfts)
  // .post(nftControllers.checkBody, nftControllers.createNFT);
  .post(nftControllers.createNFT);

router
  .route("/:id")
  .get(nftControllers.getSingleNFT)
  .patch(nftControllers.updateNFT)
  .delete(nftControllers.deleteNFT);

export default router;
