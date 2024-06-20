create table Trip (
    tid int not null auto_increment,
    lid int not null,
    bio nvarchar(2048),
    start_date date not null,
    end_date date not null,

    constraint check_dates check (start_date <= end_date),
    foreign key (lid) references Location(lid),
    primary key (tid)
);
