create table Trip (
	tid int not null auto_increment,
    lid int not null,
    bio nvarchar(2048),
    
    foreign key (lid) references Location(lid),
    primary key (tid)
);
