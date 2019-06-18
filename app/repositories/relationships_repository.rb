# frozen_string_literal: true

# Handles interface for relationships API
class RelationshipsRepository
  def self.search(token, request_id, client_ids)
    return [] if client_ids.blank?
    FerbAPI.make_api_call(
      token: token,
      request_id: request_id,
      url: FerbRoutes.relationships_path,
      method: :get,
      payload: {
        clientIds: client_ids
      }
    ).body
  end

  def self.get_relationships_for_screening_id(token, request_id, screening_id)
    return [] if screening_id.blank?
    FerbAPI.make_api_call(
      token: token,
      request_id: request_id,
      url: FerbRoutes.relationships_for_screening_path(screening_id),
      method: :get
    ).body
  end
end
