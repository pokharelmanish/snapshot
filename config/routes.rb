# frozen_string_literal: true

require File.join(File.dirname(__FILE__), 'routes/active_screenings_constraint')

Rails.application.routes.draw do
  mount Coverband::Reporters::Web.new, at: '/coverage'
  root 'home#index'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get '/security/check_permission' => 'security#check_permission'
      get '/user_info' => 'user#user_info'

      resources :relationships, only: %i[index]
      get :history_of_involvements, to: 'history_of_involvements#by_client_ids'

      resources :people, only: %i[index show]
    end
  end

  resources :version, only: :index
  get '/logout' => 'home#logout'
  get '/snapshot' => 'home#index'
  get '*path', to: 'home#index', constraints: ->(request) { request.format.html? }
end
