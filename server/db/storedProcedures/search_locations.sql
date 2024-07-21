create procedure search_locations(in search_term nvarchar(255))
begin
    select lid, city, c_code
    from Location
    where city like concat('%', search_term, '%')
    or c_code like concat('%', search_term, '%')
    limit 15;
end