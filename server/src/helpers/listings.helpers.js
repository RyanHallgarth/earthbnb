const connection = require("../../services/db.config");

// Connect to MySQL DB and get listings accoriding to the query params.
const selectListings = async (
  limit,
  skipIndex,
  sortBy,
  order,
  callback
) => {
  connection.query(
    `SELECT COUNT(*) as count FROM listings; SELECT * FROM listings ORDER BY ?? ${(order)} LIMIT ${connection.escape(limit)} OFFSET ${connection.escape(skipIndex)};`, [sortBy],
    (error, results) => {
      if (error) callback({"error": error});
      else callback(results);
    }
  );
};

// Package paginated results as a JSON object
const paginatedResults = () => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skipIndex = (page - 1) * limit;
    const sortBy = req.query.sort_by || 'title';
    let order = req.query.order || 'ASC';
    order = order.toUpperCase();
    const results = {};
    if(!page){
        res.status(422).json({"error": "Must include page number"});
    } else if (!limit){
        res.status(422).json({"error": "Must include limit number between 1-100"});
    } else if (limit < 1){
        res.status(422).json({"error": "Limit must be greater than 0"});
    } else if (limit > 100){
        res.status(422).json({"error": "Limit must be less than or equal to 100"});
    } else if (page < 1){
        res.status(422).json({"error": "Page must be greater than 0"});
    } else if (order != 'ASC' && order != 'DESC'){
        res.status(422).json({"error": "Order may only be ASC|DESC"});
    } else {
        try {
            results.results = await selectListings(
                limit, skipIndex, sortBy, order, (listings) => {
                    if ("error" in listings) res.status(503).json(listings);
                    else {
                        const totalResults = listings[0][0].count;
                        const lastPage = Math.ceil(totalResults / limit);
                        if (page > lastPage){
                            res.status(422).json({
                                error: `Page must be less than or equal to the last page.`, 
                                Last_page: lastPage, 
                                last_page_href: `/v1/listings?page=${lastPage}&limit=${limit}&sort_by=${sortBy}&order=${order}`});
                        } else{
                            let listingsObj = {
                                content: listings[1],
                                page: page,
                                results_per_page: limit,
                                total_results: totalResults,
                                links: {},
                            };
                            listingsObj.links.self =  { href: `/v1/listings?page=${page}&limit=${limit}&sort_by=${sortBy}&order=${order}`};
                            listingsObj.links.first = { href: `/v1/listings?page=1&limit=${limit}&sort_by=${sortBy}&order=${order}`};
                            listingsObj.links.prev = (page <= 1) ? { href: null} : { href:`/v1/listings?page=${page-1}&limit=${limit}&sort_by=${sortBy}&order=${order}`};
                            listingsObj.links.last = { href:`/v1/listings?page=${lastPage}&limit=${limit}&sort_by=${sortBy}&order=${order}`};
                            listingsObj.links.next = (page >= lastPage) ? { href: null} : { href:`/v1/listings?page=${page+1}&limit=${limit}&sort_by=${sortBy}&order=${order}`};
                        
                            res.json(listingsObj);
                        }
                    };
                }
            );
        } catch (error) {}
    }
  };
};

exports.paginatedResults = paginatedResults;
