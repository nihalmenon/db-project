create table Location (
	lid int not null auto_increment,
	c_code char(2) not null,
	city nvarchar(255),

	foreign key (c_code) references Country(c_code),  
	primary key (lid)
);
