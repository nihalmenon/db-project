create procedure popular_activities(in _lid int, in _start_date date, in _end_date date)
begin
    select a.a_description, a.dte
    from Activity a
    inner join Trip t on a.tid = t.tid
    where (_start_date is null or a.dte >= _start_date)
    and (_end_date is null or a.dte <= _end_date)
    and t.lid = _lid
    limit 10;
end
