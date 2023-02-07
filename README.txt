Features to Add
1 - Check the time so that stock quotes are only pulled from 7:30AM to 2pm
    - Just deactivate the update timer
2 - Get history from dB so that when you restart you can still see the full graph - 30 mins

canvasJS.com for charts
Setup for postgress dB
create user webuser with password 'happytimes'
CREATE TABLE portfolio(id serial primary key, company varchar(50) not null, ticker varchar(50), price decimal, purchaseprice decimal, catagory varchar(50) , value decimal, quantity integer, entrydate timestamp);
