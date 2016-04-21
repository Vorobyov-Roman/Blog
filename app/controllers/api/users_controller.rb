class Api::UsersController < ApplicationController
  respond_to :json

  def index
    users = User.all

    render json: users
  end

  def create
    user = User.create!(user_params)

    render json: user
  end

private
  def user_params
    params.require(:userinfo).permit(:name, :password, :email)
  end
end