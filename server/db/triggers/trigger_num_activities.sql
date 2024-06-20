-- Trigger: trigger_num_activities
-- Purpose: trips can have at most 20 activities
delimiter $$
create trigger trigger_num_activities
before insert on Activity
for each row
begin
	if ((select count(a.a_no) from Activity a where a.tid = new.tid) = 20) then
		signal SQLSTATE '45000'
		set MESSAGE_TEXT = 'A trip cannot have more than 20 activities';
    end if;
end $$
delimiter ;
