delimiter $$
create procedure get_user_trip(in _uid int)
begin
    SELECT * FROM Trips
    INNER JOIN Members ON Trips.tid = Members.tid
    WHERE Members.uid = _uid;
end $$
delimiter ;
