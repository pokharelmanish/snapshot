# frozen_string_literal: true

# Handles interface for participant API
class ParticipantRepository
  class AuthorizationError < StandardError; end

  def self.authorize(token, request_id, id)
    return if id.blank?
    FerbAPI.make_api_call(
      token: token,
      request_id: request_id,
      url: FerbRoutes.client_authorization_path(id),
      method: :get
    )
  rescue ApiError => e
    raise_error(e)
  end

  private_class_method def self.post_data(participant)
    {
      screening_id: participant.screening_id.to_s,
      legacy_descriptor: {
        legacy_id: participant.legacy_descriptor&.legacy_id,
        legacy_table_name: participant.legacy_descriptor&.legacy_table_name
      }
    }
  end

  private_class_method def self.raise_error(e)
    e.api_error[:http_code] == 403 ? raise(AuthorizationError) : raise(e)
  end
end
