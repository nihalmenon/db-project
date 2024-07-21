create procedure update_trip(in tid_in int, in start_date_in date, in end_date_in date, in bio_in nvarchar(255))
begin 
    UPDATE Trip 
    SET Trip.start_date = start_date_in, Trip.end_date = end_date_in, Trip.bio = bio_in 
    WHERE Trip.tid = tid_in;
end 
