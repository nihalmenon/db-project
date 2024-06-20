create procedure popular_activities(in _tid int)
begin
    select a.a_description, a.dte
    from Activity a
    join Trip t on a.tid = t.tid
    join (select lid, start_date, end_date from Trip where tid = _tid) trip_details 
        on t.lid = trip_details.lid
    where a.dte >= trip_details.start_date 
    and a.dte <= trip_details.end_date
    limit 20;
end
