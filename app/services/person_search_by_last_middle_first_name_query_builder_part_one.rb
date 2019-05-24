# frozen_string_literal: true

# PersonSearchByLastMiddleFirstNameQueryBuilder is a service class responsible for creation
# of an elastic search person search query
module PersonSearchByLastMiddleFirstNameQueryBuilder
  attr_reader :is_client_only, :last_name, :first_name, :middle_name, :suffix

  include QueryBuilderHelper

  def build_query(builder)
    builder.payload[:query] = query
  end

  def query
    q = { bool: { must: must } }
    f = function_score_queries(fs_query_params)
    { function_score: { query: q, functions: f, score_mode: 'max', boost_mode: 'max' } }
  end

  def must
    # the client_only_search config option overrides the @is_client_only value
    return [] unless Rails.configuration.intake[:client_only_search] || is_client_only
    [client_only]
  end

  def client_only
    match_query(field: 'legacy_descriptor.legacy_table_name', query: 'CLIENT_T', name: 'q_cli')
  end

  def match_last_middle_first_name
    last_name_params = generate_match_params('last_name', last_name, '1_exact_last', nil)
    middle_name_params = generate_match_params('middle_name', middle_name, '1_exact_middle', nil)
    first_name_params = generate_match_params('first_name', first_name, '1_exact_first', nil)
    param_list = [last_name_params, middle_name_params, first_name_params]
    match_query_list(param_list)
  end

  def match_last_middle_first_name_with_suffix
    return if suffix.blank?
    last_name_params = generate_match_params('last_name', last_name, '2_exact_last', nil)
    middle_name_params = generate_match_params('middle_name', middle_name, '2_exact_middle', nil)
    first_name_params = generate_match_params('first_name', first_name, '2_exact_first', nil)
    suffix_params = generate_match_params('name_suffix', suffix, '2_exact_suffix', nil)
    param_list = [last_name_params, middle_name_params, first_name_params, suffix_params]
    match_query_list(param_list)
  end

  def match_last_middle_first_name_akas
    last_name_aka_params = generate_match_params('akas.last_name', last_name, '3_aka_last', nil)
    middle_name_aka_params = generate_match_params('akas.middle_name', middle_name, '3_aka_middle',
      nil)
    first_name_aka_params = generate_match_params('akas.first_name', first_name, '3_aka_first', nil)
    param_list = [last_name_aka_params, middle_name_aka_params, first_name_aka_params]
    match_query_list(param_list)
  end

  def match_last_first_middle_dim
    last_name_params = generate_match_params('last_name', last_name, '4_exact_last', nil)
    first_name_params = generate_match_params('first_name', first_name, '4_exact_first', nil)
    middle_name_dim_params = generate_match_params('middle_name.diminutive', middle_name,
      '4_diminutive_middle', nil)
    param_list = [last_name_params, first_name_params, middle_name_dim_params]
    match_query_list(param_list)
  end

  def match_last_first_name
    last_name_params = generate_match_params('last_name', last_name, '5_exact_last', nil)
    first_name_params = generate_match_params('first_name', first_name, '5_exact_first', nil)
    param_list = [last_name_params, first_name_params]
    match_query_list(param_list)
  end

  def match_middle_name
    middle_name_params = generate_match_params('middle_name', middle_name, '5_no_match_middle',
      nil)
    param_list = [middle_name_params]
    match_query_list(param_list)
  end

  def match_last_name_first_name_duplicate
    last_name_params = generate_match_params('last_name', last_name, '6_exact_last', nil)
    first_name_dup_params = generate_match_params('first_name', first_name, '6_dupe_first', nil)
    middle_name_dup_params = generate_match_params('middle_name', first_name, '6_dupe_middle',
      nil)
    param_list = [last_name_params, first_name_dup_params, middle_name_dup_params]
    match_query_list(param_list)
  end

  def match_last_middle_first_name_dim
    last_name_params = generate_match_params('last_name', last_name, '7_exact_last', nil)
    middle_name_params = generate_match_params('middle_name', middle_name, '7_exact_middle', nil)
    first_name_dim_params = generate_match_params('first_name.diminutive', first_name,
      '7_diminutive_first', nil)
    param_list = [last_name_params, middle_name_params, first_name_dim_params]
    match_query_list(param_list)
  end

  def match_last_middle_dim_first_dim
    last_name_params = generate_match_params('last_name', last_name, '8_exact_last', nil)
    middle_name_dim_params = generate_match_params('middle_name.diminutive',
      middle_name, '8_diminutive_middle', nil)
    first_name_dim_params = generate_match_params('first_name.diminutive', first_name,
      '8_diminutive_first', nil)
    param_list = [last_name_params, middle_name_dim_params, first_name_dim_params]
    match_query_list(param_list)
  end

  def match_last_name_middle_name_duplicate
    last_name_params = generate_match_params('last_name', last_name, '9_exact_last', nil)
    first_name_dup_params = generate_match_params('first_name', middle_name, '9_dupe_first', nil)
    middle_name_dup_params = generate_match_params('middle_name', middle_name, '9_dupe_middle',
      nil)
    param_list = [last_name_params, first_name_dup_params, middle_name_dup_params]
    match_query_list(param_list)
  end

  def multi_match_first_middle_name_phon
    params = {
      query: formatted_query("#{first_name} #{middle_name}"),
      operator: 'or',
      fields: %w[first_name.phonetic middle_name.phonetic],
      type: 'cross_fields',
      name: '10_phonetic_first_or_middle'
    }
    multi_match(params)
  end

  def match_last_name
    last_name_params = generate_match_params('last_name', last_name, '10_exact_last', nil)
    param_list = [last_name_params]
    match_query_list(param_list)
  end

  def match_last_name_multi_match_first_middle_phon
    match_last_name.push(multi_match_first_middle_name_phon).compact
  end

  def fs_query_params
    [
      { q: match_last_middle_first_name, w: 524_288, bq: true },
      { q: match_last_middle_first_name_with_suffix, w: 1_048_576, bq: true },
      { q: match_last_middle_first_name_akas, w: 262_144, bq: true },
      { q: match_last_first_middle_dim, w: 131_072, bq: true },
      { q: match_last_first_name, not_q: match_middle_name, w: 65_536, bq: true },
      { q: match_last_name_first_name_duplicate, w: 32_768, bq: true },
      { q: match_last_middle_first_name_dim, w: 16_384, bq: true },
      { q: match_last_middle_dim_first_dim, w: 8192, bq: true },
      { q: match_last_name_middle_name_duplicate, w: 4096, bq: true },
      { q: match_last_name_multi_match_first_middle_phon, w: 2048, bq: true }
    ].compact
  end
end
