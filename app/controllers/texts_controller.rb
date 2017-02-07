require 'rest-client'
class TextsController < ActionController::Base

  def create
    puts params['data']
    res = RestClient.post('https://965c0ab6.ngrok.io/rawText', params['data'].to_json,  {content_type: :json, accept: :json})
    render text: res

  end

end