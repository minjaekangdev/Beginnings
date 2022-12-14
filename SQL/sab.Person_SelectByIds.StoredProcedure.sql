USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [sab].[Person_SelectByIds]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [sab].[Person_SelectByIds]
			@people [sab].[IntIdTable] READONLY
			/*

				
	
			Declare @targetPeople [sab].[IntIdTable]
			Insert into @targetPeople (data)
			Values(11), (16), (9), (8)

			Select *
			From @targetPeople


			Execute sab.Person_SelectByIds @targetPeople


			*/
AS 
BEGIN

	DECLARE @filteredPeople [sab].[IntIdTable]

	INSERT INTO @filteredPeople (Data) 
	SELECT DATA 
	FROM @people as p
	WHERE p.Data < 11

	SELECT [PersonId]
		  ,[LastName]
		  ,[FirstName]
		  ,t.Data
	  FROM [sab].[Person] as p left outer join @filteredPeople as t
				on p.PersonId = t.Data
	WHERE t.Data IS NOT NULL

END

GO
