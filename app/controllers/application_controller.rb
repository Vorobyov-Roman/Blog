class ApplicationController < ActionController::Base
  include JwtHelper

  protect_from_forgery with: :null_session

  rescue_from ActionController::ParameterMissing, with: :parameter_missing
  rescue_from JWT::DecodeError, with: :invalid_authentication_token

protected
  def current_user
    token = (request.authorization.sub!('Bearer ', '') if request.authorization)
    
    userinfo = decode(token)

    User.find_by(name: userinfo['name'])
  end

private
  def parameter_missing
    messages = ['Invalid request.']

    render json: { messages: messages }, status: :bad_request
  end

  def invalid_authentication_token
    messages = ['Access denied. Authorization is required.']

    render json: { messages: messages }, status: :unauthorized
  end
end
