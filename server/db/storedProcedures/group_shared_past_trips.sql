CREATE PROCEDURE group_shared_past_trips(
	IN _tid INT
)
begin
    with GroupMembers as (select m.uid from Member m where m.tid = _tid)
    select 
        t.tid as trip_id,
        l.lid as location_id,
        l.city as city_name,
        c.c_name as country_name,
        a.a_description as activity_description,
        a.dte as activity_date
    from
        Trip t
        inner join Location l on t.lid = l.lid
        inner join Country c on l.c_code = c.c_code
        left join Activity a on t.tid = a.tid
    where 
        t.tid in (
            select m.tid 
            from Member m
            where m.uid in (select uid from GroupMembers)
            and m.tid != _tid 
            group by m.tid
            having count(distinct m.uid) >= 2 -- Ensure at least 2 members
        )
        or t.tid in (
            select distinct m.tid
            from Member m
            where m.uid in (select uid from GroupMembers)
            and m.tid != _tid
            and (select count(*) from GroupMembers) = 1 -- If it's a single-person group
        )
    order by t.start_date;
end