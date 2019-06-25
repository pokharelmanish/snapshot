# frozen_string_literal: true

# PersonSearchByDateOfBirthQueryBuilder is a service class responsible for creation
# of an elastic search person search query
module PersonSearchByDateOfBirthQueryBuilder
  attr_reader :date_of_birth

  include ApplicationHelper
  include QueryBuilderHelper

  def build_query(builder)
    builder.payload[:query][:function_score][:query][:bool][:must].concat(must)
  end

  def query
    { bool: { must: must } }
  end

  def must
    [
      query_string(
        'date_of_birth_as_text',
        formatted_query(format_date(date_of_birth)),
        boost: HIGH_BOOST
      )
    ].flatten.compact
  end
end
