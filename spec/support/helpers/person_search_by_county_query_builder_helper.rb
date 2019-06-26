# frozen_string_literal: true

module PersonSearchByCountyQueryBuilderHelper
  def county_query
    query = {
      "bool": {
        "must": [
          {
            "match": {
              "sp_county": {
                "query": 'yolo',
                "_name": 'q_county'
              }
            }
          }
        ]
      }
    }

    build_query(query).as_json
  end
end
