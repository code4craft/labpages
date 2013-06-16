labpages
------------
Pages hooks for gitlab.

### Get Started

`labpages` uses sinatra framework.
	
	gem install sinatra
	git clone https://github.com/code4craft/labpages.git
	cd labpages
	
Start server:

	rackup -p port-you-like

Then add "http://your-host/update" to gitlab hooks. Try 'Test Hook' to see whether it works! **Only repo in branch "gh-pages" or repo with the same name of "your username" will be added to `labpages`**

All repo files will be stored in "/data/gitpages" by default. You can edit `config.yml` to customize your repo_dir. 

### Visit your pages

Visit your pages in "http://your-host/your-name/your-repo"。

### Cusomize your domain

First, you should get a domain and change all resovle answer (include all subdomains) to your server. Then edit `config.yml`, set `domain` to your domain. Then you can visit pages by "http://your-name.your-domain/" (for repo with same name of user) and "http://your-name.your-domain/your-repo" (for gh-pages branch)。

### Performance

To enhance the performance, 