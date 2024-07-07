CREATE PROCEDURE average_duration(IN _lid INT)
begin
	select l.city, c.c_name, avg(datediff(t.end_date, t.start_date)) as avg_duration
	from Trip t
	inner join location l on t.lid = l.lid
	inner join country c on l.c_code = c.c_code
	where l.lid = _lid
	group by l.city, c.c_name
	order by avg_duration desc;
end