delimiter $$
create procedure popular_destinations(in _minAge int default null, in _maxAge int default null, in _gender char(1) default null)
begin
    select l.lid, l.city, c.c_name, count(*) from Trip t
    inner join Location l on t.lid = l.lid
    inner join Member m on t.tid = m.tid
    inner join User u on m.uid = u.uid
    inner join Country c on l.c_code = c.c_code
    where (u.age >= minAge or minAge is null) and (u.age <= maxAge or maxAge is null) and (u.gender = gender or gender is null)
    group by l.lid, l.city, c.c_name
    order by count(*) desc
    limit 10;
end $$
delimiter ;
