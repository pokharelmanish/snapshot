# frozen_string_literal: true

# PersonSearchByLastMiddleFirstNameQueryBuilder is a service class responsible for creation
# of an elastic search person search query
module PersonSearchByLastMiddleFirstNameQueryBuilderPartTwo
  attr_reader :is_client_only, :last_name, :first_name, :middle_name

  include QueryBuilderHelper

  def build_query(builder)
    queries = function_score_queries(fs_query_params)
    builder.payload[:query][:function_score][:functions].concat(queries)
  end

  def query
    f = function_score_queries(fs_query_params)
    { function_score: { functions: f, score_mode: 'max', boost_mode: 'max' } }
  end

  def last_name_params(name)
    generate_match_params('last_name', last_name, name, nil)
  end

  def match_last_name_middle_name_duplicate
    first_name_dup_params = generate_match_params('first_name', middle_name, '9_dupe_first', nil)
    middle_name_dup_params = generate_match_params('middle_name', middle_name, '9_dupe_middle',
      nil)
    param_list = [last_name_params('9_exact_last'), first_name_dup_params, middle_name_dup_params]
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
      { q: match_last_name_middle_name_duplicate, w: 4096, bq: true },
      { q: match_last_name_multi_match_first_middle_phon, w: 2048, bq: true }
    ].compact
  end
end
