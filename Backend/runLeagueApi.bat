@echo off
:: To start it just right click on 'run.bat' and click 'Run Code'
:: Runs the server in seperate terminal window
:: Ctrl+c to quit the server
:: 
::
:: api startup command, logs into terminal for now
start cmd /k uvicorn leaguesApi:app --host localhost --port 8100 --reload 2>&1