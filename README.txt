Features to Add
3 - Put websocket stock streaming into a class
4 - figure out methodical way to handle switching between screens. Need to add click events and do something when entering and exiting.
5 - Protect API Key - May have to move all that functionality to Node
Features Completed
1 - Check the time so that stock quotes are only pulled from 7:30AM to 2pm
    - Just deactivate the update timer
2 - Get history from dB so that when you restart you can still see the full graph - 30 mins

canvasJS.com for charts
Setup for postgress dB
create user webuser with password 'happytimes'
CREATE TABLE portfolio(id serial primary key, company varchar(50) not null, ticker varchar(50), price decimal, purchaseprice decimal, catagory varchar(50) , value decimal, quantity integer, entrydate timestamp);

{"data":[{"c":["1","12"],"p":118.815,"s":"XOM","t":1676055242474,"v":1},{"c":["1","8"],"p":118.81,"s":"XOM","t":1676055242333,"v":101},{"c":["1","8","12"],"p":118.81,"s":"XOM","t":1676055242333,"v":79},{"c":["1","8"],"p":118.81,"s":"XOM","t":1676055242333,"v":100},{"c":["1"],"p":118.81,"s":"XOM","t":1676055242333,"v":100},{"c":["1"],"p":118.81,"s":"XOM","t":1676055242333,"v":100},{"c":["1","12"],"p":118.81,"s":"XOM","t":1676055242334,"v":10}],"type":"trade"}
