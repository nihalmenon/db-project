DELIMITER $$

CREATE PROCEDURE add_user(
	IN _first_name NVARCHAR(30),
	IN _last_name NVARCHAR(30),
	IN _dob DATE,
	IN _gender CHAR(1),
	IN _email NVARCHAR(255),
	IN _phone NVARCHAR(15),
	IN _socials NVARCHAR(255),
	IN _pwd NVARCHAR(255)
)
BEGIN
	INSERT INTO User (first_name, last_name, dob, gender, email, phone, socials, pwd)
	VALUES (_first_name, _last_name, _dob, _gender, _email, _phone, _socials, _pwd);
END $$

DELIMITER ;
