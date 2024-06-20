delimiter $$
create procedure suggested_members(in _uid int)
begin
    with UserTrips as (
        select t.tid from Member m
        inner join Trip t on t.tid = m.tid
        where m.uid = _uid
        group by t.tid
    ),
    Friends as (
        select distinct m.uid from Member m
        inner join UserTrips ut on ut.tid = m.tid
        inner join User u on u.uid = m.uid
        where m.uid != _uid
    ),
    FriendsOfFriends as (
        select distinct m2.uid
        from Member m1
        inner join Member m2 on m1.tid = m2.tid
        where m1.uid in (select uid from Friends)
        and m2.uid != _uid
        and m2.uid not in (select uid from Friends)
    )
    select u.uid, u.first_name, u.last_name, u.socials 
    from User u
    where u.uid in (select uid from FriendsOfFriends) or u.uid in (select uid from Friends);
end $$
delimiter ;
