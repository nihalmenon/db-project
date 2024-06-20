-- Trigger: trigger_activity_date
-- Purpose: ensures a trip's activities fall between it's start/end dates
delimiter $$
create trigger trigger_activity_date
before insert on Activity
for each row
begin
	if (
    new.dte < (select t.start_date from Trip t where t.tid = new.tid) or 
    new.dte > (select t.end_date from Trip t where t.tid = new.tid)
    ) then
		signal SQLSTATE '45000'
		set MESSAGE_TEXT = 'Date must fall between the trip start/end dates';
    end if;
end $$
delimiter ;
