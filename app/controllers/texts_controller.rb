require 'rest-client'
class TextsController < ActionController::Base

  def create
    puts params['data']
    res = RestClient.post('https://a95d1ab3.ngrok.io/rawText', params['data'].to_json,  {content_type: :json, accept: :json})
    if !res.starts_with?('http')
      res = 'http://' + res
    end
    render text: res

  end

end