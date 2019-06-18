# frozen_string_literal: true

require 'rails_helper'

describe ParticipantRepository do
  let(:token) { 'my_token' }
  let(:request_id) { 'my_request_id' }
  let(:screening_id) { '1' }

  describe '.authorize' do
    let(:participant_id) { '22' }

    it 'should return when authorization succeeds' do
      expect(FerbAPI).to receive(:make_api_call)
        .with(
          token: token,
          request_id: request_id,
          url: "/authorize/client/#{participant_id}",
          method: :get
        )
        .and_return(status: 200)

      expect do
        described_class.authorize(token, request_id, participant_id)
      end.not_to raise_error
    end

    it 'should raise an error when authorization fails' do
      url = "/authorize/client/#{participant_id}"
      expect(FerbAPI).to receive(:make_api_call)
        .with(
          token: token,
          request_id: request_id,
          url: url,
          method: :get
        )
        .and_raise(
          ApiError.new(
            message: 'Forbidden',
            sent_attributes: '',
            url: url,
            method: :get,
            response: OpenStruct.new(
              status: 403,
              body: 'Forbidden'
            )
          )
        )

      expect do
        described_class.authorize(token, request_id, participant_id)
      end.to raise_error(described_class::AuthorizationError)
    end

    it 'should reraise unexpected API errors' do
      url = "/authorize/client/#{participant_id}"

      exception = ApiError.new(
        message: 'I am a teapot',
        sent_attributes: '',
        url: url,
        method: :get,
        response: OpenStruct.new(
          status: 418,
          body: 'I am a teapot'
        )
      )

      expect(FerbAPI).to receive(:make_api_call)
        .with(
          token: token,
          request_id: request_id,
          url: url,
          method: :get
        )
        .and_raise(exception)

      expect do
        described_class.authorize(token, request_id, participant_id)
      end.to raise_error(exception)
    end
  end
end
