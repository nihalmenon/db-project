create procedure get_itinerary(in _tid int)
begin
    select a.tid, a.a_no, a.dte, a.a_description from Activity a where a.tid = _tid;
end