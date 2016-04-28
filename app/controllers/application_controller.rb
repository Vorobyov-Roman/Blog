class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  rescue_from ActionController::ParameterMissing, with: :parameter_missing

private
  def parameter_missing
    messages = ['Invalid request.']

    render json: { messages: messages }, status: :bad_request
  end
end
