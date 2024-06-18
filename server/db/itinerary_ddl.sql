create table Itinerary (
	iid int not null auto_increment,
	tid int not null,
    activity nvarchar(1024),
    dte date,
    primary key (iid),
    foreign key (tid) references Trip(tid) 
);
