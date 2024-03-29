import db from "../models";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import chothuephongtro from "../../data/chothuephongtro.json";
import chothuecanho from "../../data/chothuecanho.json";
import nhachothue from "../../data/nhachothue.json";
import chothuematbang from "../../data/chothuematbang.json";
import generateCode from "../utils/generateCode";
import { dataPrice, dataArea } from "../utils/data";
import { getNumberFromString } from "../utils/common";

require("dotenv").config();

const dataBody = [
  {
    body: chothuephongtro.body,
    categoryCode: "CTPT",
  },
  {
    body: chothuematbang.body,
    categoryCode: "CTMB",
  },
  {
    body: chothuecanho.body,
    categoryCode: "CTCH",
  },
  {
    body: nhachothue.body,
    categoryCode: "NCT",
  },
];

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const insertService = () => {
  return new Promise((resolve, reject) => {
    try {
      const provinceCodes = [];
      const labelCodes = [];
      dataBody.forEach((cate) => {
        cate.body.forEach(async (item) => {
          let postId = v4();
          let labelCode = generateCode(item?.header?.class?.classType).trim();
          let provinceCode = generateCode(
            item?.header?.address?.split(",")?.at(-1).trim()
          );
          labelCodes.every((item) => item?.code !== labelCode) &&
            labelCodes.push({
              code: labelCode,
              value: item?.header?.class?.classType.trim(),
            });
          provinceCodes.every((item) => item?.code !== provinceCode) &&
            provinceCodes.push({
              code: provinceCode,
              value: item?.header?.address?.split(",")?.at(-1).trim(),
            });
          let attributesId = v4();
          let userId = v4();
          let overviewId = v4();
          let imagesId = v4();
          let currentArea = getNumberFromString(
            item?.header?.attributes?.acreage
          );
          let currentPrice = getNumberFromString(
            item?.header?.attributes?.price
          );

          //Tao bang post
          await db.Post.create({
            id: postId,
            title: item?.header?.title,
            star: item?.header?.star,
            labelCode,
            address: item?.header?.address,
            attributesId,
            categoryCode: cate.categoryCode,
            description: JSON.stringify(item?.mainContent?.content), //content la array nen stringify ve chuoi de luu
            userId,
            overviewId,
            imagesId,
            areaCode: dataArea.find(
              (area) => area.max > currentArea && area.min <= currentArea
            )?.code,
            priceCode: dataPrice.find(
              (price) => price.max > currentPrice && price.min <= currentPrice
            )?.code,
            provinceCode,
          });

          //Tao bang attribute
          await db.Attribute.create({
            id: attributesId,
            price: item?.header?.attributes?.price,
            acreage: item?.header?.attributes?.acreage,
            published: item?.header?.attributes?.published,
            hashtag: item?.header?.attributes?.hashtag,
          });

          //Tao bang image
          await db.Image.create({
            id: imagesId,
            image: JSON.stringify(item?.images),
          });

          //Tao bang overview
          await db.Overview.create({
            id: overviewId,
            code: item?.overview?.content.find(
              (item) => item.name === "Mã tin:"
            )?.content,
            area: item?.overview?.content.find(
              (item) => item.name === "Khu vực"
            )?.content,
            type: item?.overview?.content.find(
              (item) => item.name === "Loại tin rao:"
            )?.content,
            target: item?.overview?.content.find(
              (item) => item.name === "Đối tượng thuê:"
            )?.content,
            bonus: item?.overview?.content.find(
              (item) => item.name === "Gói tin:"
            )?.content,
            created: item?.overview?.content.find(
              (item) => item.name === "Ngày đăng:"
            )?.content,
            expired: item?.overview?.content.find(
              (item) => item.name === "Ngày hết hạn:"
            )?.content,
          });

          //Tao bang user
          await db.User.create({
            id: userId,
            name: item?.contact?.content.find(
              (item) => item.name === "Liên hệ:"
            )?.content,
            password: hashPassword("111111"),
            phone: item?.contact?.content.find(
              (item) => item.name === "Điện thoại:"
            )?.content,
            zalo: item?.contact?.content.find((item) => item.name === "Zalo")
              ?.content,
          });
        });
      });

      // Tao bang province
      provinceCodes?.forEach(async (item) => {
        await db.Province.create(item);
      });

      // Tao bang label
      labelCodes?.forEach(async (item) => {
        await db.Label.create(item);
      });

      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};

export const createPricesAndAreas = () =>
  new Promise((resolve, reject) => {
    try {
      dataPrice.forEach(async (item, index) => {
        await db.Price.create({
          code: item.code,
          order: index + 1,
          value: item.value,
        });
      });
      dataArea.forEach(async (item, index) => {
        await db.Area.create({
          code: item.code,
          order: index + 1,
          value: item.value,
        });
      });
      resolve("ok");
    } catch (error) {
      reject(error);
    }
  });
