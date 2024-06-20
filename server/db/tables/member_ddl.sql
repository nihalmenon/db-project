create table Member (
    uid int not null,
    tid int not null,

    foreign key (uid) references User(uid) on delete cascade,
    foreign key (tid) references Trip(tid) on delete cascade,
    primary key (uid, tid)
);
