delimiter $$
create procedure add_trip_member(in _uid int, in _tid int)
begin
	insert into Member (uid, tid) values (_uid, _tid);
end $$
delimiter ;
