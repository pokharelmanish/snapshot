# frozen_string_literal: true

require 'rails_helper'

describe PersonSearchByCountyQueryBuilder do
  let(:county) { 'Yolo' }
  let(:county_query) { PersonSearchResultBuilder.new.county_query }
  let(:params) do
    { county: county }
  end

  describe '.query' do
    context 'returns hash' do
      it 'with query' do
        query_builder = QueryBuilder.new(person_search_fields: params)
        query = query_builder.extend(described_class).query
        expect(query.as_json).to eq county_query['query']
      end
    end
  end
end
