# frozen_string_literal: true

require 'rails_helper'
require 'feature/testing'

feature 'login' do
  let(:auth_login_url) { 'http://www.example.com/authn/login?callback=' }
  let(:auth_logout_url) { 'http://www.example.com/authn/logout' }
  let(:auth_validation_url) { 'http://www.example.com/authn/validate?token=123' }
  let(:auth_access_code_url) { 'http://www.example.com/authn/token?accessCode=tempToken123' }
  let(:auth_artifact) do
    { staffId: '1234' }
  end
  let(:staff_info) do
    { first_name: 'Joe', last_name: 'Cool' }
  end
  let(:relationships_dummy_results) { [{ id: '1' }, { id: '2' }] }
  let(:base_path) { '' }

  around do |example|
    Feature.run_with_activated(:authentication, :perry_version_two) do
      with_config(
        authentication_base_url: 'http://www.example.com',
        authentication_login_url: auth_login_url,
        authentication_logout_url: auth_logout_url,
        base_path: base_path
      ) do
        example.run
      end
    end
  end

  scenario 'user has not logged in' do
    visit root_path
    expect(page.current_url).to have_content(auth_login_url)
  end

  context 'user provides valid security access code' do
    let(:staff_url) { ferb_api_url(FerbRoutes.staff_path(1234)) }
    before do
      stub_request(:get, ferb_api_url(FerbRoutes.relationships_path))
        .and_return(json_body(relationships_dummy_results, status: 200))
    end

    scenario 'and verification provides staff_id' do
      stub_request(:get, auth_access_code_url)
        .and_return(json_body('123', status: 200))
      stub_request(:get, auth_validation_url)
        .and_return(json_body(auth_artifact.to_json, status: 200))
      stub_request(:get, staff_url)
        .and_return(json_body(staff_info.to_json, status: 200))
      visit root_path(accessCode: 'tempToken123')
      expect(a_request(:get, auth_access_code_url)).to have_been_made
      expect(a_request(:get, auth_validation_url)).to have_been_made
      expect(a_request(:get, staff_url)).to have_been_made
      expect(page.current_url).to_not have_content auth_login_url
      expect(page).to have_current_path(root_path(accessCode: 'tempToken123'))
    end

    scenario 'and verification does not provide staff_id' do
      stub_request(:get, auth_access_code_url)
        .and_return(json_body('123', status: 200))
      stub_request(:get, auth_validation_url)
        .and_return(status: 200)
      visit root_path(accessCode: 'tempToken123')
      expect(a_request(:get, auth_access_code_url)).to have_been_made
      expect(a_request(:get, auth_validation_url)).to have_been_made
      expect(a_request(:get, staff_url)).to_not have_been_made
      expect(page.current_url).to_not have_content auth_login_url
      expect(page).to have_current_path(root_path(accessCode: 'tempToken123'))
    end

    context 'with global header' do
      before do
        stub_request(:get, auth_access_code_url)
          .and_return(json_body('123', status: 200))
        stub_request(:get, auth_validation_url)
          .and_return(json_body(auth_artifact.to_json, status: 200))
        stub_request(:get, staff_url)
          .and_return(json_body(user_info.to_json, status: 200))
      end

      context 'when there is a user on the session' do
        let(:user_info) { staff_info }

        scenario 'user sees their name on the global header' do
          visit root_path(accessCode: 'tempToken123')
          expect(a_request(:get, auth_access_code_url)).to have_been_made
          expect(a_request(:get, auth_validation_url)).to have_been_made
          expect(a_request(:get, staff_url)).to have_been_made
          expect(page).to have_css 'header', text: 'Joe Cool'
        end

        scenario 'when user logs out' do
          visit root_path(accessCode: 'tempToken123')
          # regular click_link won't keep the pop-up menu open for some reason
          execute_script('$(".fa.fa-user").click()')
          click_link 'Logout'
          expect(page.current_url).not_to have_content root_path(accessCode: 'tempToken123')
          expect(page.current_url).to have_content '/logout'
        end
      end

      context 'when there is no user on the session' do
        let(:user_info) { {} }

        scenario 'user sees "Not Available" if there is no user on session' do
          visit root_path(accessCode: 'tempToken123')
          expect(page).to have_css 'header', text: 'Not Available'
        end
      end
    end
  end

  scenario 'user provides invalid access code' do
    stub_request(:get, auth_access_code_url).and_return(json_body('', status: 401))
    visit root_path(accessCode: 'tempToken123')
    expect(a_request(:get, auth_access_code_url)).to have_been_made
    expect(page.current_url).to have_content auth_login_url
  end

  scenario 'user has already logged in' do
    staff_url = ferb_api_url(FerbRoutes.staff_path(1234))
    stub_request(:get, ferb_api_url(FerbRoutes.relationships_path))
      .and_return(json_body(relationships_dummy_results, status: 200))
    stub_request(:get, auth_access_code_url).and_return(json_body('123', status: 200))
    stub_request(:get, auth_validation_url)
      .and_return(json_body(auth_artifact.to_json, status: 200))
    stub_request(:get, staff_url)
      .and_return(json_body(staff_info.to_json, status: 200))
    visit root_path(accessCode: 'tempToken123')
    expect(a_request(:get, auth_access_code_url)).to have_been_made
    expect(a_request(:get, auth_validation_url)).to have_been_made
    WebMock.reset!

    stub_system_codes
    stub_request(:get, ferb_api_url(FerbRoutes.relationships_path))
      .and_return(json_body(relationships_dummy_results, status: 200))
    visit root_path
    expect(a_request(:get, %r{http://www.example.com})).to_not have_been_made
    expect(page).to have_current_path(root_path)
  end
end

feature 'login perry v1' do
  let(:auth_login_url) { 'http://www.example.com/authn/login?callback=' }
  let(:auth_validation_url) { 'http://www.example.com/authn/validate?token=123' }
  let(:auth_artifact) do
    { staffId: '1234' }
  end
  let(:staff_info) do
    { first_name: 'Joe', last_name: 'Cool' }
  end
  let(:relationships_dummy_results) { [{ id: '1' }, { id: '2' }] }

  around do |example|
    Feature.run_with_activated(:authentication) do
      with_config(
        authentication_base_url: 'http://www.example.com',
        authentication_login_url: auth_login_url,
        base_path: ''
      ) do
        example.run
      end
    end
  end

  scenario 'user has not logged in' do
    visit root_path
    expect(page.current_url).to have_content(auth_login_url)
  end

  context 'user provides valid security token' do
    let(:staff_url) { ferb_api_url(FerbRoutes.staff_path(1234)) }
    before do
      stub_request(:get, ferb_api_url(FerbRoutes.relationships_path))
        .and_return(json_body(relationships_dummy_results, status: 200))
    end

    scenario 'and verification provides staff_id' do
      stub_request(:get, auth_validation_url)
        .and_return(json_body(auth_artifact.to_json, status: 200))
      stub_request(:get, staff_url)
        .and_return(json_body(staff_info.to_json, status: 200))
      visit root_path(token: 123)
      expect(a_request(:get, auth_validation_url)).to have_been_made
      expect(a_request(:get, staff_url)).to have_been_made
      expect(page.current_url).to_not have_content auth_login_url
      expect(page).to have_current_path(root_path(token: 123))
    end

    scenario 'and verification does not provide staff_id' do
      stub_request(:get, auth_validation_url)
        .and_return(status: 200)
      visit root_path(token: 123)
      expect(a_request(:get, auth_validation_url)).to have_been_made
      expect(a_request(:get, staff_url)).to_not have_been_made
      expect(page.current_url).to_not have_content auth_login_url
      expect(page).to have_current_path(root_path(token: 123))
    end

    context 'with global header' do
      scenario 'user sees his name on the global header' do
        stub_request(:get, auth_validation_url)
          .and_return(json_body(auth_artifact.to_json, status: 200))
        stub_request(:get, staff_url)
          .and_return(json_body(staff_info.to_json, status: 200))
        visit root_path(token: 123)
        expect(a_request(:get, auth_validation_url)).to have_been_made
        expect(a_request(:get, staff_url)).to have_been_made
        expect(page).to have_css 'header', text: 'Joe Cool'
      end

      scenario 'user sees "Not Available" if there is no user on session' do
        stub_request(:get, auth_validation_url)
          .and_return(json_body(auth_artifact.to_json, status: 200))
        stub_request(:get, staff_url)
          .and_return(json_body({}.to_json, status: 200))
        visit root_path(token: 123)
        expect(page).to have_css 'header', text: 'Not Available'
      end
    end
  end

  scenario 'user provides invalid security token' do
    stub_request(:get, auth_validation_url).and_return(status: 401)
    visit root_path(token: 123)
    expect(a_request(:get, auth_validation_url)).to have_been_made
    expect(page.current_url).to have_content auth_login_url
  end

  scenario 'user has already logged in' do
    staff_url = ferb_api_url(FerbRoutes.staff_path(1234))
    stub_request(:get, staff_url)
      .and_return(json_body(staff_info.to_json, status: 200))
    stub_request(:get, ferb_api_url(FerbRoutes.relationships_path))
      .and_return(json_body(relationships_dummy_results, status: 200))
    stub_request(:get, auth_validation_url)
      .and_return(json_body(auth_artifact.to_json, status: 200))
    # .and_return(status: 200)
    visit root_path(token: 123)
    expect(a_request(:get, auth_validation_url)).to have_been_made
    WebMock.reset!

    stub_system_codes
    stub_request(:get, ferb_api_url(FerbRoutes.relationships_path))
      .and_return(json_body(relationships_dummy_results, status: 200))
    visit root_path
    expect(a_request(:get, %r{http://www.example.com})).to_not have_been_made
    expect(page).to have_current_path(root_path)
  end
end
