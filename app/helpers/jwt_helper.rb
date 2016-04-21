module JwtHelper
  def encode(user, attrs = {})
    secret = Rails.application.secrets.secret_key_base
    payload = camelized(attrs).merge(name: user.name)

    JWT.encode(payload, secret, 'HS256')
  end

private
  def camelized(hash)
    hash.map { |k, v| [k.to_s.camelize(:lower), v] }.to_h
  end
end