create procedure search_match_trips(in _tid int)
begin
    SELECT t2.tid, t2.start_date, t2.end_date, t2.lid, t2.bio, l.city, c.c_name, u.uid, u.first_name, u.last_name, u.dob, u.socials
    FROM Trip t1
    INNER JOIN Trip t2 ON t1.lid = t2.lid AND t1.tid != t2.tid
    INNER JOIN Member m ON t2.tid = m.tid
    INNER JOIN User u ON m.uid = u.uid
    INNER JOIN Location l ON t2.lid = l.lid
    INNER JOIN Country c ON l.c_code = c.c_code
    WHERE t1.tid = _tid AND t1.start_date <= t2.end_date AND t1.end_date >= t2.start_date;
end
