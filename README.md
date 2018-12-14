# Tedious App

Vue.js/Vuetify + Node.js/Sails.js + Tedious + MSSQL


### Install SQL Server
```sudo docker pull microsoft/mssql-server-linux:2017-latest```

```docker run -e 'HOMEBREW_NO_ENV_FILTERING=1' -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=yourStrong(!)Password' -p 1433:1433 -d microsoft/mssql-server-linux```

Install sqlcmd on macOS, 
```
brew tap microsoft/mssql-release https://github.com/Microsoft/homebrew-mssql-release
brew update
brew install --no-sandbox msodbcsql17 mssql-tools
```

Install sqlcmd on Windows

[Install the ODBC Driver]https://www.microsoft.com/en-us/download/details.aspx?id=56567

[Install the SQL Server Command Line Utilities]https://www.microsoft.com/en-us/download/details.aspx?id=53591
-  Testing SQL Query:

 ```sqlcmd -S 127.0.0.1 -U sa -P your_password -Q "SELECT @@VERSION;"```

- Creating sample database:

```
sqlcmd -S 127.0.0.1 -U sa -P your_password -Q "CREATE DATABASE DBE;"
```

- Importing sql dump
```
sqlcmd -S 127.0.0.1 -U sa -P your_password -d DBE -i ./schema.sql
```

### Start up this project
- Node server running

`sails lift` or `node app.js`

default server port: http://localhost:1337

- Connection checking

`GET /api-v1/api-v1/checkingConnection`
