const db = require('../Database/database.js');

module.exports = {
  getAllProducts: (page, count) => {
    const currentId = (count * (page - 1)) + 1;
    const lastId = currentId + (count - 1);
    const sqlString = `SELECT * FROM product WHERE id >= ${currentId} and id <= ${lastId}`;
    return db.query(sqlString);
  },
  getProduct: (product_id) => {
    // var sqlString = (`Select product.id as id, product.name, product.slogan, product.description, product.category, product.default_price, features.feature, features.value from product LEFT Join features ON features.product_id = product.id WHERE product.id = ${product_id}`);

    // var sqlString = `SELECT
    // json_build_object(
    //   'product_id', product.id,
    //   'name', product.name,
    //   'slogan', product.slogan,
    //   'description', product.description,
    //   'category', product.category,
    //   'default_price', product.default_price,
    //   'features', features
    // ) products
    // FROM product
    // LEFT JOIN (
    //   SELECT
    //   product_id,
    //   json_agg(
    //     json_build_object(
    //       'feature', feature,
    //       'value', value
    //     )
    //   ) features
    //   FROM features
    //   GROUP BY product_id
    // ) features ON (product.id = features.product_id)
    // WHERE product.id = ${product_id}`

    var sqlString = `SELECT json_build_object(
      'product_id', product.id,
      'name', product.name,
      'slogan', product.slogan,
      'description', product.description,
      'category', product.category,
      'default_price', product.default_price,
      'features', (SELECT coalesce(features, '[]'::json)
      FROM (
        SELECT json_agg(
          json_build_object(
            'feature', features.feature,
            'value', features.value
          )
        ) AS features FROM features WHERE features.product_id = product.id
      ) AS container
    )
	) AS final FROM product WHERE product.id = ${product_id} ORDER BY product.id`
    return db.query(sqlString)
  },
  getProductStyles: (product_id) => {
    var sqlString = `SELECT
    json_agg(
      json_build_object(
        'style_id', styles.id,
        'name', styles.name,
        'original_price', styles.original_price,
        'sale_price', styles.sale_price,
        'default?', styles.default_style,
        'photos', (SELECT coalesce(photos, '[]'::json)
			FROM (
			SELECT json_agg(
			json_build_object(
				'thumbnail_url', photos.thumbnail_url,
				'url', photos.url
			)
			) AS photos from photos WHERE photos.style_id = styles.id
			) as photos
				  ),
		  'skus', (SELECT coalesce(skus, '{}'::json)
				  FROM (
					  SELECT
					  json_object_agg(
						  skus.id,
						  json_build_object(
							  'quantity', skus.quantity,
							  'size', skus.size
						  )
					  ) AS skus from skus WHERE skus.style_id = styles.id
				  ) as skus
				  )
      )
    ) AS results from styles where styles.product_id = ${product_id}`

    return db.query(sqlString)
  },
  getRelatedProducts: (product_id) => {
    var sqlString = `SELECT
    json_agg(
      related_product_id
    )
    FROM related
    WHERE current_product_id = ${product_id}`;
    return db.query(sqlString)
  }
}



