
import axios from "axios";
import React, { useEffect, useState } from "react";
import {createNFT} from  '../../../../server/models/nftModel.js'
export const createNfTRequest = async (nfts,res,req) => {
  const data = new FormData();


  
  for (let key in nfts) {
   // newNFT.append(key, nfts[key]);
    data.append(key, nfts[key]);
  }
  // const nfts = nfts && nfts.length ? nfts[0].name : 'Lloadsifahjadsoifj..........'
  // console.log(nfts)
  await createNFT && createNFT.axios.post("http://localhost:3033/api/v1/nfts", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Accept": "application/json"
    },

  })
    .then((res) => {
      console.log(res.data)
    })
};
