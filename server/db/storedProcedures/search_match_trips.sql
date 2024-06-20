delimiter $$
create procedure search_match_trips(in _tid int)
begin
    SELECT * FROM Trip t1, Trip t2
    INNER JOIN Member m ON t.tid = m.tid
    INNER JOIN User u ON m.uid = u.uid
    WHERE t1.tid = _tid AND t1.tid != t2.tid AND t1.lid = t2.lid AND t1.start_date <= t2.end_date AND t1.end_date >= t2.start_date;
end $$
delimiter ;
