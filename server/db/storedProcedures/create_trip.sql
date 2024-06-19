delimiter //
create procedure create_trip(in _lid int, in _bio nvarchar(2048))
begin
	insert into Trip (lid, bio) 
    values (_lid, _bio);
end //
delimiter ;
