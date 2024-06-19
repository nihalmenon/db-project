delimiter $$
create procedure search_trips_location(in _lid int)
begin
    SELECT FROM Trips WHERE lid = _lid;
end $$
delimiter ;
