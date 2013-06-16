require 'sinatra/base'
require 'json'
require 'yaml'
require 'logger'
require 'fileutils'


class GitPagesHook < Sinatra::Base
  logger = Logger.new('log.log', 'daily')
  config = YAML.load_file('config.yml')
  if  !File.exist? config["repo_dir"]
    logger.info("dir #{config['repo_dir']} not exist, make it.")
    FileUtils.mkdir_p config["repo_dir"]
  end
  set bind: "0.0.0.0"
  set port: 8080

  get '/ping' do
    'Gitlab Web Hook is up and running :-)'
  end

  # gitlab hook
  post '/update' do
    repoInfo = JSON.parse(request.body.read)
    branch = /([^\/]+)$/.match(repoInfo['ref'])[1]
    if repoInfo['repository']['name']!=repoInfo['user_name'] && branch!="gh-pages"
      return
    end
    repoPath = "#{config['repo_dir']}/#{repoInfo['user_name']}/#{repoInfo['repository']['name']}"
    if (File.exist? repoPath)
      logger.info("start to pull #{repoInfo['repository']['url']} to dir #{repoPath}")
      system("cd #{repoPath};git pull #{repoInfo['repository']['url']};git checkout -f #{branch}");
      logger.info('pull success!')
    else
      logger.info("start to clone #{repoInfo['repository']['url']} to dir #{repoPath}")
      system("git clone #{repoInfo['repository']['url']} #{repoPath};cd #{repoPath};git checkout -f #{branch}");
      logger.info('clone success!')
    end
  end

  # for domains
  before do
    if !request.host.end_with? config["domain"]
      return
    end
    userName=request.host.gsub(config["domain"], '')
    # remove dot at end
    userName=userName.gsub(/\.$/, "")
    if userName.length>0
      match = /\/([^\/]+)/.match(request.path_info)
      if match
        repoName = match[1]
        filePath=[config["repo_dir"], userName, repoName].join('/')
        if File.exist? filePath
          request.path_info = '/'+userName+'/'+request.path_info
          return
        end
      end
      filePath=[config["repo_dir"], userName, userName].join('/')
      if File.exist? filePath
        request.path_info = '/'+userName+'/'+userName+request.path_info
      end
    end
  end

  # for static files
  get %r{\.\w+$} do
    if request.path_info.include? ".git/"
      raise Sinatra::NotFound
    end
    if File.exist? config["repo_dir"]+request.path_info
      send_file config["repo_dir"]+request.path_info;
    else
      raise Sinatra::NotFound
    end
  end

# for index.html
  get %r{.*$} do
    path = request.path_info;
    if !path.end_with? "/"
      path +='/'
    end
    if File.exist?(config["repo_dir"]+path+"index.html")
      send_file config["repo_dir"]+path+"index.html";
      return
    end
    if File.exist?(config["repo_dir"]+path+"index.htm")
      send_file config["repo_dir"]+path+"index.htm";
    else
      pass
    end
  end

  run! if app_file == $0
end