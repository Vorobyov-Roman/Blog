module JwtHelper
  def encode(attrs = {})
    payload = camelized(attrs).merge(iat: issued_at, jti: token_id)

    JWT.encode(payload, secret, 'HS256')
  end

  def decode(token)
    body, header = JWT.decode(token, secret, true, algorithm: 'HS256')
    body
  end

private
  def camelized(hash)
    hash.map { |k, v| [k.to_s.camelize(:lower), v] }.to_h
  end

  def secret
    Rails.application.secrets.secret_key_base
  end

  def issued_at
    Time.now.to_i
  end

  def token_id
    jti_raw = [secret, issued_at].join(':').to_s
    Digest::MD5.hexdigest(jti_raw)
  end
end