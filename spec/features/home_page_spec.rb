# frozen_string_literal: true

require 'rails_helper'
require 'feature/testing'
feature 'home page' do
  it_behaves_like :authenticated do
    context 'when snapshot is not enabled' do
      around do |example|
        Feature.run_with_deactivated(:snapshot) do
          example.run
        end
      end

      scenario 'hide start snapshot button' do
        stub_request(:get, ferb_api_url(FerbRoutes.relationships_path)).and_return(
          json_body([], status: 200)
        )
        visit root_path(accessCode: access_code)
        expect(page).not_to have_button 'Start Snapshot'
      end
    end

    context 'when both screenings and snapshot are enabled' do
      before(:each) do
        visit root_path(accessCode: access_code)
      end

      it 'screenings can be sorted by clickable name, status, and Screening Start Date/Time' do
        expect(page).to have_title 'Intake'
        expect(page).to have_button 'Start Snapshot'
      end
    end
  end
end
