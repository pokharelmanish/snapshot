# frozen_string_literal: true

# The external Ferb routes will be accessible from here.
class FerbRoutes
  class << self
    def staff_path(id)
      "/staffpersons/#{id}"
    end

    def client_authorization_path(id)
      "/authorize/client/#{id}"
    end

    def relationships_path
      '/clients/relationships'
    end

    def history_of_involvements_path
      '/clients/history_of_involvements'
    end

    def relationships_for_screening_path(screening_id)
      "/screenings/#{screening_id}/relationships_with_candidates"
    end

    def participants_path(legacy_id)
      "/participants/#{legacy_id}"
    end
  end
end
