class Api::AuthController < ApplicationController
  include JwtHelper

  respond_to :json

  def login
    credentials = params.require(:userinfo)
    user = User.where(name:     credentials[:name],
                      password: credentials[:password]).take

    data = {
      messages: []
    }
    status_code = if user
                    data[:token] = encode(name: user.name, logged_in: 1)
                    data[:messages].push('Successfully logged in.')

                    :ok
                  else
                    data[:messages].push('Invalid authentication data.')

                    :unauthorized
                  end

    render json: data, status: status_code
  end
end