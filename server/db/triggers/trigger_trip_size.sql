delimiter $$
create trigger trigger_trip_size 
before insert on Member
for each row
begin
	if ((select count(m.uid) from Member m where m.tid = new.tid) = 25) then
		signal SQLSTATE '45000'
		set MESSAGE_TEXT = 'A trip cannot have more than 25 members';
    end if;
end $$
delimiter ;
