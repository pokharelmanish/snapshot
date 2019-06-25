# frozen_string_literal: true

require 'rails_helper'

describe PersonSearchByClientIdQueryBuilder do
  describe '.build_query' do
    let(:person_search_fields) do
      { client_id: '1111111111111111111' }
    end
    let(:client_id_only_query) { PersonSearchResultBuilder.new.client_id_only_query }

    context 'returns hash' do
      it 'with query' do
        query_builder = QueryBuilder.new(person_search_fields: person_search_fields)
        query = query_builder.extend(described_class).query
        expect(query.as_json).to eq client_id_only_query['query']
      end
    end
  end
end
