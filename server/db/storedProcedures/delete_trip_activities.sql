create procedure delete_trip_activities(in tid_in int)
begin 
    DELETE FROM Activity WHERE Activity.tid = tid_in;  
end