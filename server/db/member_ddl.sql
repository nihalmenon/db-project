create table Member (
	uid int not null,
    tid int not null,
    
    foreign key (uid) references User(uid),
    foreign key (tid) references Trip(tid),
    primary key (uid, tid)
);
