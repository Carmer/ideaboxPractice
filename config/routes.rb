Rails.application.routes.draw do
  # For details on t he DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "ideas#index"
  namespace :api do
    namespace :v1 do
      resources :ideas
    end
  end

end
