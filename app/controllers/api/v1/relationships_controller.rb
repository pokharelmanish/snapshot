# frozen_string_literal: true

module Api
  module V1
    class RelationshipsController < ApiController # :nodoc:
      def index
        render json: relationships_by_search
      end

      private

      def relationships_by_search
        RelationshipsRepository.search(
          session[:token],
          request.uuid,
          client_ids
        )
      end

      def client_ids
        params[:clientIds].split ','
      end
    end
  end
end
