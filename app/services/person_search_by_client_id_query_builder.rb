# frozen_string_literal: true

# PersonSearchByClientIdQueryBuilder is a service class responsible for creation
# of an elastic search person search query
module PersonSearchByClientIdQueryBuilder
  attr_reader :client_id
  include QueryBuilderHelper

  def build_query(builder)
    builder.payload[:query] = query
  end

  def query
    { bool: { must: must } }
  end

  def must
    [match_query(field: 'legacy_descriptor.legacy_ui_id_flat', query: formatted_query(client_id),
                 boost: HIGH_BOOST)].flatten.compact
  end
end
