// import database from './database.json'
import { ezload } from "../server.js";

function check(data, keyword) {
  if (keyword.name !== "none") {
    const words = keyword.name.split(" ");
    for (const i of words) {
      if (!data.name.includes(i)) return false;
    }
  }
  if (keyword.seller !== "none") {
    if (!data.seller.includes(keyword.seller)) return false;
  }
  if (keyword.xCm !== -1) if (data.xCm !== keyword.xCm) return false;
  if (keyword.yCm !== -1) if (data.yCm !== keyword.yCm) return false;
  if (keyword.zCm !== -1) if (data.zCm !== keyword.zCm) return false;
  if (keyword.xI !== -1) if (data.xI !== keyword.xI) return false;
  if (keyword.yI !== -1) if (data.yI !== keyword.yI) return false;
  if (keyword.zI !== -1) if (data.zI !== keyword.zI) return false;
  return true;
}

async function search(keyword,database) {
  //console.log("database:",database);
  const show = [];
  for (const i of database) {
    if (check(i, keyword)) show.push(i);
  }
  return show;
  //console.log(show);
}

export default search;