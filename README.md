# Tedious App

Vue.js/Vuetify + Node.js/Sails.js + Tedious + MSSQL


### Install SQL Server
```sudo docker pull microsoft/mssql-server-linux:2017-latest```

```docker run -e 'HOMEBREW_NO_ENV_FILTERING=1' -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=yourStrong(!)Password' -p 1433:1433 -d microsoft/mssql-server-linux```

When try to connect via terminal CMD, 
```
brew tap microsoft/mssql-release https://github.com/Microsoft/homebrew-mssql-release
brew update
brew install --no-sandbox msodbcsql17 mssql-tools
```
-  SQL Query testing:

 ```sqlcmd -S 127.0.0.1 -U sa -P your_password -Q "SELECT @@VERSION;"```

- Sample database creating:

```
sqlcmd -S 127.0.0.1 -U sa -P your_password -Q "CREATE DATABASE SampleDB;"
```

### Start up this project
- Node server running

`sails lift` or `node app.js`

default server port: http://localhost:1337

- Connection checking

`GET /api-v1/api-v1/checkingConnection`
