import axios from "axios";
import React, { useEffect, useState } from "react";
import { createNFT } from "../../../../server/controllers/nftControllers.js";
import { setDbFetch } from "../../Context/NFTMarketplaceContext.js";
import { newNFT } from "../../../../server/controllers/nftControllers.js";
export const getPostsRequest = async () =>
  await axios.get("http://localhost:3033/api/v1/nfts");

export const createNfTRequest = async (nfts) => {
  const nft = new FormData()
  for (let key in nfts) {
    nft.append(key, nfts[key]);
  }


  const res = await axios.post("http://localhost:3033/api/v1/nfts", nft, {
        headers: {
          "Content-Type": "multipart/form-data",
      
        },
      })
      console.log(res.data)
  
};

export const createPostRequest = async (post) => {
  const form = new FormData();
  for (let key in post) {
    form.append(key, post[key]);
  }
  return await axios.post("http://localhost:3033/api/posts", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updatePostRequest = async (id, newPostFields) => {
  const form = new FormData();
  for (let key in newPostFields) {
    form.append(key, newPostFields[key]);
  }
  return axios.put("http://localhost:3033/api/posts" + id, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
