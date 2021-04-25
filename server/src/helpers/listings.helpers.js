const connection = require('../../services/db.config.js');
const qs = require('qs');
const assert = require('assert');

// Connect to MySQL DB and get listings accoriding to the query params.
const selectListings = async (
  limit,
  skipIndex,
  sortBy,
  order,
  priceMin,
  priceMax,
  accommodatesMin,
  bathroomsMin,
  bedroomsMin,
  bedsMin,
  callback
) => {
  connection.query(
    `SELECT COUNT(*) as count 
    FROM listings    
    WHERE (price >= ${priceMin}
      AND price <= ${priceMax}
      AND accommodates >= ${accommodatesMin}
      AND bathrooms >= ${bathroomsMin}
      AND bedrooms >= ${bedroomsMin}
      AND beds >= ${bedsMin}); 
    
    SELECT * 
    FROM listings 
    WHERE (price >= ${priceMin}
    AND price <= ${priceMax}
    AND accommodates >= ${accommodatesMin}
    AND bathrooms >= ${bathroomsMin}
    AND bedrooms >= ${bedroomsMin}
    AND beds >= ${bedsMin})
    ORDER BY ?? ${order} 
    LIMIT ${connection.escape(limit)} 
    OFFSET ${connection.escape(skipIndex)};`,
    [sortBy],
    (error, results) => {
      if (error) callback({ error: error });
      else callback(results);
    }
  );
};

// Connect to MySQL DB and get listings accoriding to the query params.
const selectListing = async (id, callback) => {
  connection.query(
    `SELECT * 
    FROM listings 
    WHERE id = ${id};`,
    (error, results) => {
      if (error) callback({ error: error });
      else callback(results);
    }
  );
};

// Package paginated results as a JSON object
const paginatedResults = () => {
  return async (req, res, next) => {
    // const testQuery =
    //   'page=1&limit=100&sort_by=name&order=asc&price[gte]=10&price[lte]=100&num_guests[gte]=4';
    // const parsedQuery = qs.parse(testQuery);
    const parsedQuery = qs.parse(req.query);
    console.log(parsedQuery);
    const page = parseInt(parsedQuery.page);
    const limit = parseInt(parsedQuery.limit);
    const skipIndex = (page - 1) * limit;
    const sortBy = parsedQuery.sort_by || 'name';
    const order = (parsedQuery.order || 'ASC').toUpperCase();
    const priceMin = parsedQuery.price ? parsedQuery.price.gte : 0;
    const priceMax = parsedQuery.price ? parsedQuery.price.lte : 10000;
    const accommodatesMin = parsedQuery.min_guests || 0;
    const bathroomsMin = parsedQuery.min_bathrooms || 0;
    const bedroomsMin = parsedQuery.min_bedrooms || 0;
    const bedsMin = parsedQuery.min_beds || 0;

    const results = {};
    if (!page)
      return res.status(422).json({ error: 'Must include page number' });
    if (!limit)
      return res
        .status(422)
        .json({ error: 'Must include limit number between 1-100' });
    if (limit < 1)
      return res.status(422).json({ error: 'Limit must be greater than 0' });
    if (limit > 100)
      return res
        .status(422)
        .json({ error: 'Limit must be less than or equal to 100' });
    if (page < 1)
      return res.status(422).json({ error: 'Page must be greater than 0' });
    if (order != 'ASC' && order != 'DESC')
      return res.status(422).json({ error: 'Order may only be ASC|DESC' });
    try {
      results.results = await selectListings(
        limit,
        skipIndex,
        sortBy,
        order,
        priceMin,
        priceMax,
        accommodatesMin,
        bathroomsMin,
        bedroomsMin,
        bedsMin,
        (listings) => {
          if ('error' in listings) return res.status(503).json(listings);
          const totalResults = listings[0][0].count;
          const lastPage = Math.ceil(totalResults / limit);
          if (page > lastPage) {
            return res.status(422).json({
              error: `Page must be less than or equal to the last page.`,
              Last_page: lastPage,
              last_page_href: `/v1/listings?page=${lastPage}&limit=${limit}&sort_by=${sortBy}&order=${order}`,
            });
          }
          let listingsObj = {
            content: listings[1],
            page: page,
            results_per_page: limit,
            total_results: totalResults,
            links: {},
          };
          listingsObj.links.self = {
            href: `/v1/listings?page=${page}&limit=${limit}&sort_by=${sortBy}&order=${order}`,
          };
          listingsObj.links.first = {
            href: `/v1/listings?page=1&limit=${limit}&sort_by=${sortBy}&order=${order}`,
          };
          listingsObj.links.prev =
            page <= 1
              ? { href: null }
              : {
                  href: `/v1/listings?page=${
                    page - 1
                  }&limit=${limit}&sort_by=${sortBy}&order=${order}`,
                };
          listingsObj.links.last = {
            href: `/v1/listings?page=${lastPage}&limit=${limit}&sort_by=${sortBy}&order=${order}`,
          };
          listingsObj.links.next =
            page >= lastPage
              ? { href: null }
              : {
                  href: `/v1/listings?page=${
                    page + 1
                  }&limit=${limit}&sort_by=${sortBy}&order=${order}`,
                };

          res.json(listingsObj);
        }
      );
    } catch (error) {}
  };
};

const selectTopListings = async (numListings, callback) => {
  connection.query(
    `SELECT * 
    FROM listings 
    ORDER BY review_scores_rating DESC, number_of_reviews DESC
    LIMIT ${numListings};`,
    (error, results) => {
      if (error) callback({ error: error });
      else callback(results);
    }
  );
};

const selectUniqueListings = async (numListings, callback) => {
  connection.query(
    `SELECT * 
    FROM listings 
    WHERE property_type NOT IN ('Apartment', 'House', 'Condominium', 'Cabin', 'Bed & Breakfast', 'Loft', 'Townhouse', 'Other' )
    ORDER BY review_scores_rating DESC, number_of_reviews DESC
    LIMIT ${numListings};`,
    (error, results) => {
      if (error) callback({ error: error });
      else callback(results);
    }
  );
};

const selectEntirePlaceListings = async (
  numListings,
  accomodates,
  callback
) => {
  connection.query(
    `SELECT * 
    FROM listings 
    WHERE room_type IN ('Entire home/apt') AND accommodates >= ${accomodates}
    ORDER BY review_scores_rating DESC, number_of_reviews DESC
    LIMIT ${numListings};`,
    (error, results) => {
      if (error) callback({ error: error });
      else callback(results);
    }
  );
};

const selectListingamenities = async (id, callback) => {
  connection.query(
    `SELECT amenities 
    FROM listings 
    WHERE id = ${id};`,
    (error, results) => {
      if (error) callback({ error: error });
      else {
        //console.log(JSON.parse(results.amenities[0]));
        console.log(results[0].amenities);
        var amenitiesStr = results[0].amenities;
        amenitiesStr = amenitiesStr.replace('{', '');
        amenitiesStr = amenitiesStr.replace('}', '');
        amenitiesStr = amenitiesStr.replace(/"/g, '');
        const amenities = amenitiesStr.split(',');
        console.log(amenities);
        callback(amenities);
      }
    }
  );
};

exports.selectListing = selectListing;
exports.paginatedResults = paginatedResults;
exports.selectTopListings = selectTopListings;
exports.selectUniqueListings = selectUniqueListings;
exports.selectEntirePlaceListings = selectEntirePlaceListings;
exports.selectListingamenities = selectListingamenities;
