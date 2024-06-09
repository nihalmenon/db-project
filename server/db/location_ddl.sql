create table Location (
	lid int not null auto_increment,
	country_code char(2) not null,
	city nvarchar(255),

	foreign key (country_code) references Country(country_code),  
	primary key (lid)
);