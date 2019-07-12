# frozen_string_literal: true

# parent class for dora search
class BaseQueryBuilder
  include QueryBuilderHelper

  attr_reader :search_term, :search_after, :is_client_only, :size, :payload,
    :params, :city, :county, :street, :client_id, :date_of_birth, :gender,
    :approximate_age, :approximate_age_units, :search_by_age_method, :total_results_received

  def self.build(params = {})
    builder = new(params)
    build_base(builder)
    builder
  end

  # instance methods
  def initialize(params = {})
    @params = params.with_indifferent_access
    initialize_search
    initialize_name_fields
    initialize_additional_search_fields
    initialize_county_field
    @payload = build_query
  end

  def initialize_search
    @search_term              = params.dig(:person_search_fields, :search_term)
    @search_after             = params[:search_after]
    @is_client_only           = params.fetch(:is_client_only, 'true') == 'true'
    @size                     = params.fetch(:size, '0').to_i
    @total_results_received   = params.fetch(:total_results_received, '0').to_i
  end

  def initialize_name_fields
    @last_name                = params.dig(:person_search_fields, :last_name)
    @first_name               = params.dig(:person_search_fields, :first_name)
    @middle_name              = params.dig(:person_search_fields, :middle_name)
    @suffix                   = params.dig(:person_search_fields, :suffix)
  end

  def initialize_additional_search_fields
    @client_id                = params.dig(:person_search_fields, :client_id)
    @ssn                      = params.dig(:person_search_fields, :ssn)
    @date_of_birth            = params.dig(:person_search_fields, :date_of_birth)
    @approximate_age          = params.dig(:person_search_fields, :approximate_age)
    @approximate_age_units    = params.dig(:person_search_fields, :approximate_age_units)
    @gender                   = params.dig(:person_search_fields, :gender)
  end

  def initialize_county_field
    @county                   = params.dig(:person_search_fields, :county)
  end

  def advanced_search_on?
    params.fetch(:is_advanced_search_on, 'false') == 'true'
  end

  def client_id_searched?
    params.dig(:person_search_fields, :client_id).present?
  end

  def ssn_searched?
    params.dig(:person_search_fields, :ssn).present?
  end

  def county_searched?
    params.dig(:person_search_fields, :county).present?
  end

  def age_search_method
    params.dig(:person_search_fields, :search_by_age_method)
  end

  def last_name_only?
    @last_name.present? && @middle_name.blank? && @first_name.blank? && @suffix.blank?
  end

  def last_name_and_suffix_only?
    @last_name.present? && @middle_name.blank? && @first_name.blank? && @suffix.present?
  end

  def last_first_name_only?
    @last_name.present? && @middle_name.blank? && @first_name.present?
  end

  def build_query
    {
      size:  '250', track_scores: TRACK_SCORES,
      sort: sort, min_score: MIN_SCORE, _source: fields, highlight: highlight
    }.tap { |query| query[:search_after] = @search_after if @search_after }
  end

  def sort
    [{ _score: 'desc', 'last_name.keyword': 'asc', 'first_name.keyword': 'asc', _uid: 'desc' }]
  end

  def auto_bar_highlight
    { 'matched_fields': ['autocomplete_search_bar', 'autocomplete_search_bar.phonetic',
                         'autocomplete_search_bar.diminutive'] }
  end

  def fields
    %w[id legacy_source_table first_name middle_name last_name name_suffix gender akas
       date_of_birth date_of_death ssn languages races ethnicity client_counties case_status
       addresses.id addresses.effective_start_date addresses.street_name addresses.street_number
       addresses.city addresses.county addresses.state_code addresses.zip addresses.type
       addresses.legacy_descriptor addresses.phone_numbers.number addresses.phone_numbers.type
       csec.start_date csec.end_date csec.csec_code_id csec.description sp_county sp_phone
       legacy_descriptor highlight phone_numbers.id phone_numbers.number phone_numbers.type
       estimated_dob_code sensitivity_indicator race_ethnicity
       open_case_responsible_agency_code]
  end

  def highlight
    { order: 'score',
      number_of_fragments: NUMBER_OF_FRAGMENTS,
      require_field_match: REQUIRE_FIELD_MATCH,
      fields: { autocomplete_search_bar: auto_bar_highlight, searchable_date_of_birth: {} } }
  end
end
