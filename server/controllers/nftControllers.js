///-----Part 3
///-----Part 3
import NFT from "./../models/nftModel.js";
import APIFeatures from "../utils/apiFeatures.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";





const aliasTopNFTs = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage, difficulty";
  next();
};

const getAllNfts = catchAsync(async (req, res, next) => {
  // // BUILD QUERY
  const features = new APIFeatures(NFT.find(), req.body)
    .filter()
    .sort()
    .limitFields()
    .pagination();
  // console.log(JSON.stringify(features));
  const nfts = await features.query;
  //SEND QUERY
  res.status(200).json({
    status: "OK",
    results: nfts.length,
    data: {
      nfts,
    },
  });
});

//Post method
const createNFT = catchAsync(async (req, res, next) => {
  const newNFT = await NFT.create(req.body);
  res.status(201).json({
    status: "OK",
    data: {
      nft: newNFT,
    },
  });
  next();
});

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image = null;
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const newPost = new Post({ title, description, image });
    await newPost.save();
    return res.json(newPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



//Get Single nft
const getSingleNFT = catchAsync(async (req, res, next) => {
  const nft = await NFT.findById(req.params.id);

  if (!nft) {
    return next(new AppError("Kein NFT unter dieser Adresse gefunden", 404));
  }

  res.status(200).json({
    status: "OK",
    data: {
      nft,
    },
  });
});
// Patch Method
const updateNFT = catchAsync(async (req, res, next) => {
  const nft = await NFT.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!nft) {
    return next(new AppError("Kein NFT unter dieser Adresse gefunden", 404));
  }
  res.status(200).json({
    status: "OK",
    data: {
      nft,
    },
  });
});

// Delet Method
const deleteNFT = catchAsync(async (req, res, next) => {
  const nft = await NFT.findByIdAndDelete(req.params.id);
  if (!nft) {
    return next(new AppError("Kein NFT unter dieser Adresse gefunden", 404));
  }
  res.status(204).json({
    status: "OK",
    data: null,
  });
});

//Aggregation PIPELINE
const getNFTsStats = catchAsync(async (req, res, next) => {
  const stats = await NFT.aggregate([
    {
      $match: {
        ratingsAverage: { $gte: 4.5 },
      },
    },
    {
      $group: {
        _id: { $toUpper: "$difficulty" },
        // _id:"$ratingsAverage",
        numNFT: { $sum: 1 },
        numRatings: { $sum: "$ratingsQuantity" },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    {
      $sort: { avgRating: 1 },
    },
    {
      $match: {
        _id: { $ne: " EASY" },
      },
    },
  ]);
  res.status(200).json({
    status: "OK",
    data: {
      stats,
    },
  });
});
//CALCULATING NUMBER OF NFTS CREATE IN THE MONTH OR MONTHLY PLAN
const getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await NFT.aggregate([
    {
      $unwind: "$startDates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-02-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$startDates" },
        numNFTStarts: { $sum: 1 },
        nfts: { $push: "$name" },
      },
    },
    {
      $addFields: {
        month: "$_id",
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numNFTStarts: -1 },
    },
    {
      $limit: 10,
    },
  ]);
  res.status(200).json({
    status: "OK",
    data: plan,
  });
});

export default {
  aliasTopNFTs,
  getAllNfts,
  createNFT,
  getSingleNFT,
  updateNFT,
  deleteNFT,
  getNFTsStats,
  getMonthlyPlan,
  	
};
