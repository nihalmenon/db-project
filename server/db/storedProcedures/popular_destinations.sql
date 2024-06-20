create procedure popular_destinations(in _minAge int, in _maxAge int, in _gender char(1))
begin
    select 
        l.lid, 
        l.city, 
        c.c_name, 
        count(*) as trip_count
    from 
        trip t
        inner join location l on t.lid = l.lid
        inner join member m on t.tid = m.tid
        inner join user u on m.uid = u.uid
        inner join country c on l.c_code = c.c_code
    where 
        (_minAge is null or timestampdiff(year, u.dob, curdate()) >= _minAge)
        and (_maxAge is null or timestampdiff(year, u.dob, curdate()) <= _maxAge)
        and (_gender is null or u.gender = _gender)
    group by 
        l.lid, 
        l.city, 
        c.c_name
    order by 
        trip_count desc
    limit 10;
end