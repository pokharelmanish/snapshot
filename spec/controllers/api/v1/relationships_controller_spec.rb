# frozen_string_literal: true

require 'rails_helper'

describe Api::V1::RelationshipsController do
  let(:token) { 'my_token' }
  let(:session) { { token: token } }

  let(:expected_json) do
    [
      {
        id: '12',
        first_name: 'Aubrey',
        last_name: 'Campbell',
        relationships: [
          {
            first_name: 'Jake',
            last_name: 'Campbell',
            relationship: 'Sister',
            related_person_id: '7'
          }
        ]
      }
    ].to_json
  end

  let(:client_ids) do
    ['12']
  end

  describe '#index' do
    it 'fetches relationships for snapshot' do
      expect(RelationshipsRepository).to receive(:search)
        .with(token, anything, client_ids)
        .and_return(expected_json)

      process :index,
        method: :get,
        params: { clientIds: client_ids.join(',') },
        session: session
      expect(JSON.parse(response.body)).to match array_including(
        a_hash_including(
          'id' => '12',
          'first_name' => 'Aubrey',
          'last_name' => 'Campbell',
          'relationships' => array_including(
            a_hash_including(
              'first_name' => 'Jake',
              'last_name' => 'Campbell',
              'relationship' => 'Sister',
              'related_person_id' => '7'
            )
          )
        )
      )
    end
  end
end
