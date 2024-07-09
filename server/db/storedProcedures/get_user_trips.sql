create procedure get_user_trips(in _uid int)
begin
    SELECT t.tid, t.lid, l.city, c.c_name, t.start_date, t.end_date, t.bio FROM Trip t
    INNER JOIN Member m ON t.tid = m.tid
    INNER JOIN Location l ON t.lid = l.lid
    INNER JOIN Country c ON l.c_code = c.c_code
    WHERE m.uid = _uid;
end
