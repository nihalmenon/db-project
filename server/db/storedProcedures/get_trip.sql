delimiter $$
create procedure get_trip(in _tid int)
begin
    SELECT * FROM Trips WHERE tid = _tid;
end $$
delimiter ;
