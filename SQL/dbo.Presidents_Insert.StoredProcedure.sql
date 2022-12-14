USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Presidents_Insert]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Presidents_Insert]
									@FirstName nvarchar(50)
									,@LastName nvarchar(50)
									,@InaugurationDate datetime2
									,@FirstYearInOffice int
									,@LastYearInOffice int
									,@PartyAffiliation nvarchar(50)
									,@Id int OUTPUT
as

/*
SELECT *
FROM dbo.Presidents


DECLARE 							@FirstName nvarchar(50) = 'Jimmy'
									,@LastName nvarchar(50) = 'Carter'
									,@FirstYearInOffice int = 1977
									,@LastYearInOffice int = 1981
									,@PartyAffiliation nvarchar(50) = 'Democratic'
									,@Id int

EXECUTE dbo.Presidents_Insert 
							@FirstName
							,@LastName
							,@FirstYearInOffice
							,@LastYearInOffice
							,@PartyAffiliation
							,@Id OUTPUT


SELECT * 
FROM dbo.Presidents


*/

BEGIN

INSERT INTO [dbo].[Presidents]
           ([FirstName]
           ,[LastName]
		   ,[InaugurationDate]
           ,[FirstYearInOffice]
           ,[LastYearInOffice]
           ,[PartyAffiliation])
     VALUES
           (@FirstName
		   ,@LastName
		   ,@InaugurationDate
		   ,@FirstYearInOffice
		   ,@LastYearInOffice
		   ,@PartyAffiliation)

SET	@Id = SCOPE_IDENTITY()

END
GO
