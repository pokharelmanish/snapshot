# frozen_string_literal: true

module PersonSearchByLastMiddleFirstNameQueryBuilderPartTwoHelper
  def last_middle_first_name_functions_part_two
    [
      {
        "filter": {
          "bool": {
            "must": [
              {
                "match": {
                  "last_name": {
                    "query": 'last name',
                    "_name": '9_exact_last'
                  }
                }
              },
              {
                "match": {
                  "first_name": {
                    "query": 'middle name',
                    "_name": '9_dupe_first'
                  }
                }
              },
              {
                "match": {
                  "middle_name": {
                    "query": 'middle name',
                    "_name": '9_dupe_middle'
                  }
                }
              }
            ]
          }
        },
        "weight": 4096
      },
      {
        "filter": {
          "bool": {
            "must": [
              {
                "match": {
                  "last_name": {
                    "query": 'last name',
                    "_name": '10_exact_last'
                  }
                }
              },
              {
                "multi_match": {
                  "query": 'first name middle name',
                  "type": 'cross_fields',
                  "operator": 'or',
                  "_name": '10_phonetic_first_or_middle',
                  "fields": ['first_name.phonetic', 'middle_name.phonetic']
                }
              }
            ]
          }
        },
        "weight": 2048
      }
    ]
  end

  def fs_no_last_middle_first_query_part_two
    query = {
      "function_score": {
        "functions": [],
        "score_mode": 'max',
        "boost_mode": 'max'
      }
    }

    build_query(query).as_json
  end

  def fs_last_middle_first_name_query_part_two
    query = {
      "function_score": {
        "functions": last_middle_first_name_functions_part_two,
        "score_mode": 'max',
        "boost_mode": 'max'
      }
    }

    build_query(query).as_json
  end
end
