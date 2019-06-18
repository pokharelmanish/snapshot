# frozen_string_literal: true

require 'rails_helper'
require 'feature/testing'

feature 'error pages' do
  let(:base_path) { 'intake' }
  around do |example|
    Rails.application.config.consider_all_requests_local = false
    Rails.application.config.action_dispatch.show_exceptions = true
    example.run
    Rails.application.config.consider_all_requests_local = true
    Rails.application.config.action_dispatch.show_exceptions = false
  end

  context 'page does not exist' do
    scenario 'renders 404 page' do
      if ENV.key?('TEST_ENV_NUMBER')
        skip 'Pending as this test fails during parallel runs'
      end
      stub_request(:get, '/this_page_does_not_exist').and_return(json_body('NotFound', status: 404))
      visit '/this_page_does_not_exist'
      expect(page).to have_text('Sorry, this is not the page you want.')
      expect(page).to have_text(
        "It may have been deleted or doesn't exist. Please check the address or"
      )
      expect(page).to have_link('Return to your dashboard', href: '/')
    end
  end
end
