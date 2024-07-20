create procedure add_activity(in _tid int, in _a_no int, in _a_description nvarchar(1024), _dte date)
begin
	insert into Activity (tid, a_no, a_description, dte) values (_tid, _a_no, _a_description, _dte);
end

