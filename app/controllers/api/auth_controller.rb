class Api::AuthController < ApplicationController
  include JwtHelper

  respond_to :json

  def login
    credentials = params.require(:userinfo)
    user = User.where(name:     credentials[:name],
                      password: credentials[:password]).take!

    render json: { token: encode(logged_in: true) }
  end
end