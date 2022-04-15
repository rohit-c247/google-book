import Search from "../model/search.js";
import User from "../model/user.js";
import { getJSON } from "../utils/requests.js";
import { BOOKS_END_POINT } from "../config/loadSecrete.js";

/**
 * @api {get} /books Books List
 * @apiName GetBooks
 * @apiGroup Books
 * @apiHeader {string} x-access-token token of auth user
 * @apiDescription Get list of all books
 * @apiQuery {string} qurey="name of book"
 * @apiQuery {number} page=1 current page number
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 * {
 *   success: true,
 *   message: "Books fetched successfully.",
 *   query: "query string passed"
 *   data: [{}],
 *}
 * @apiError (Error 500) {string} message error message
 * @apiError (Error 500) {string} error error stack
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "message": "We are having some error while completing your request. Please try again after some time."
 *   "error": actual error stack
 * }
 */
export const books = async (req, res) => {
  try {
    const {
      providerId,
      query: { search, offset = 0, limit = 10 },
    } = req;
    const searchData = await Search.findOneAndUpdate(
      { string: search },
      {},
      { new: true, setDefaultsOnInsert: true, upsert: true }
    );

    const userInfo = await User.findOne({ providerId: providerId });

    const Index = userInfo.searchString.findIndex(
      (done) => done.string.toString() === searchData._id.toString()
    );

    if (Index === -1)
      userInfo.searchString.push({ string: searchData._id, times: 1 });
    else
      userInfo.searchString[Index].times = userInfo.searchString[0].times + 1;
    await userInfo.save();
    const options = {
      URL: `${BOOKS_END_POINT}?q=${search}&maxResults=${limit}&startIndex=${
        offset - 1
      }`,
      port: 443,
    };
    const result = await getJSON(options);
    return res.status(200).json({
      success: true,
      data: result,
      query: search,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: true,
    });
  }
};

/**
 * @api {get} /book/:id Book Detail
 * @apiName GetBooks
 * @apiGroup Books
 * @apiHeader {string} x-access-token token of auth user
 * @apiDescription Get list of all books
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 * {
 *   success: true,
 *   message: "Book fetched successfully.",
 *   data: [{}],
 *}
 * @apiError (Error 500) {string} message error message
 * @apiError (Error 500) {string} error error stack
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "message": "We are having some error while completing your request. Please try again after some time."
 *   "error": actual error stack
 * }
 */
export const detail = async (req, res) => {
  try {
    const { id } = req.params;
    const options = {
      URL: `${BOOKS_END_POINT}/${id}`,
      port: 443,
    };
    const result = await getJSON(options);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: true,
    });
  }
};
