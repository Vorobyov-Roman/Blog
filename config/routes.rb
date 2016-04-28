Rails.application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)

  root 'page#index'

  namespace :api, defaults: { format: :json } do
    post 'login', to: 'auth#login'
    
    resources :users, only: [:index, :create]
    resources :posts, only: [:index, :create]
  end
end
