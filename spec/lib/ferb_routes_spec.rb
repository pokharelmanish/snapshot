# frozen_string_literal: true

require 'rails_helper'

describe FerbRoutes do
  describe '.staff_path' do
    it 'returns /staffpersons/:id' do
      expect(described_class.staff_path(24)).to eq('/staffpersons/24')
    end
  end

  describe '.relationships_path' do
    it 'returns the base path' do
      expect(described_class.relationships_path).to eq(
        '/clients/relationships'
      )
    end
  end

  describe '.history_of_involvements_path' do
    it 'returns the base path' do
      expect(described_class.history_of_involvements_path).to eq(
        '/clients/history_of_involvements'
      )
    end
  end

  describe '.relationships_for_screening_path' do
    it '/screenings/:screening_id/relationships_with_candidates' do
      expect(described_class.relationships_for_screening_path(5)).to eq(
        '/screenings/5/relationships_with_candidates'
      )
    end
  end
end
