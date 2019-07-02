# frozen_string_literal: true

# PersonSearchBySexOfBirthQueryBuilder is a service class responsible for creation
# of an elastic search person search query
module PersonSearchBySexAtBirthQueryBuilder
  attr_reader :gender

  include QueryBuilderHelper

  def build_query(builder)
    builder.payload[:query][:function_score][:query][:bool][:filter].concat(must)
  end

  def query
    { bool: { must: must } }
  end

  def must
    [
      match_query(field: 'gender', query: formatted_query(gender), name: 'q_gender')
    ].flatten.compact
  end
end
