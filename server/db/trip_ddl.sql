create table Trip (
    tid int not null auto_increment,
    lid int not null,
    bio nvarchar(2048),
    start_date date not null,
    end_date date not null,

    foreign key (lid) references Location(lid),
    primary key (tid)
);
