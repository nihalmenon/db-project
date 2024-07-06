create procedure get_user_trips(in _uid int)
begin
    SELECT * FROM Trip
    INNER JOIN Member ON Trip.tid = Member.tid
    WHERE Member.uid = _uid;
end
