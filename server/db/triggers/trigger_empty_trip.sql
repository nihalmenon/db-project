-- Trigger: trigger_empty_trip
-- Purpose: if the only member of a trip leaves, the trip is deleted
create trigger trigger_empty_trip
after delete on Member
for each row
begin
	if (not exists(select m.uid from Member m where m.tid = old.tid)) then
		delete from Trip t where t.tid = old.tid;
	end if;
end
