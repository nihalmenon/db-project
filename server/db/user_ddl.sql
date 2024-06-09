create table User (
	uid int not null auto_increment,
    first_name nvarchar(30) not null,
    last_name nvarchar(30) not null,
    dob date not null,
    gender char(1) default 'x',
    email nvarchar(255) not null,
    phone nvarchar(15),
    socials nvarchar(255),
    pwd nvarchar(255) not null,
    
    constraint check_gender check(gender = 'm' or gender = 'f' or gender = 'x'),
    primary key (uid)
);
