# frozen_string_literal: true

module PersonSearchByDateOfBirthQueryBuilderHelper
  def date_of_birth_query
    query = {
      "bool": {
        "must": [
          {
            "query_string": {
              "default_field": 'date_of_birth_as_text',
              "query": '05051989',
              "boost": '14'
            }
          }
        ]
      }
    }

    build_query(query).as_json
  end
end
