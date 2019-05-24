# frozen_string_literal: true

require 'rails_helper'

describe PersonSearchByLastFirstNameQueryBuilderPartTwo do
  describe '.build_query' do
    let(:last_name) { 'last name' }
    let(:first_name) { 'first name' }

    let(:no_name_query) { PersonSearchResultBuilder.new.fs_no_name_query_part_two }
    let(:full_name_query) { PersonSearchResultBuilder.new.fs_full_name_query_part_two }

    let(:no_name_params) {}
    let(:full_name_params) do
      {
        last_name: last_name,
        first_name: first_name,
      }
    end

    context 'returns hash' do
      it 'with no name query' do
        query_builder = QueryBuilder.new(person_search_fields: no_name_params)
        query = query_builder.extend(described_class).query
        expect(query.as_json).to eq no_name_query['query']
      end
    end

    context 'returns hash' do
      it 'with full name query' do
        query_builder = QueryBuilder.new(person_search_fields: full_name_params)
        query = query_builder.extend(described_class).query
        expect(query.as_json).to eq full_name_query['query']
      end
    end
  end
end
