class Api::UsersController < ApplicationController
  respond_to :json

  def index
    users = User.all

    render json: users
  end

  def create
    user = User.create(user_params)

    messages = []
    status_code = if user.errors.empty?
                    messages.push('New user is successfully registered.')
                    :created
                  else
                    messages.push(*user.errors.full_messages)
                    :bad_request  
                  end

    render json: { messages: messages }, status: status_code
  end

private
  def user_params
    params.require(:userinfo).permit(:name, :password, :email)
  end
end