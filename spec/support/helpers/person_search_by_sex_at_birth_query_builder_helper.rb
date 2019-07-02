# frozen_string_literal: true

module PersonSearchBySexAtBirthQueryBuilderHelper
  def gender_query
    query = {
      "bool": {
        "must": [
          {
            "match": {
              "gender": {
                "query": 'male',
                "_name": 'q_gender'
              }
            }
          }
        ]
      }
    }

    build_query(query).as_json
  end
end
