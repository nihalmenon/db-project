create table Activity (
	tid int not null,
    a_no int not null,
    a_description nvarchar(1024),
    dte date,

    primary key (tid, a_no),
    foreign key (tid) references Trip(tid) 
);
