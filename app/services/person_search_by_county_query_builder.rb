# frozen_string_literal: true

# PersonSearchByCountyQueryBuilder is a service class responsible for creation
# of an elastic search person search query
module PersonSearchByCountyQueryBuilder
  attr_reader :county

  include QueryBuilderHelper

  def build_query(builder)
    builder.payload[:query][:function_score][:query][:bool][:must].concat(must)
  end

  def query
    { bool: { must: must } }
  end

  def must
    [match_query(field: 'sp_county', query: formatted_query(county))].flatten.compact
  end
end
