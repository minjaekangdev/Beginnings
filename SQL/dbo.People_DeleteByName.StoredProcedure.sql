USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[People_DeleteByName]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[People_DeleteByName]
	@name nvarchar(50)
as

/*

	Declare @name nvarchar(50) = 'Sally'

	  Select * 
	  From dbo.People
	  WHERE Name = @name;

	Execute dbo.People_DeleteByName @name

	 Select *
	  From dbo.People
	  WHERE Name = @name;


*/

BEGIN

	  DELETE FROM [dbo].[People]
	  WHERE Name = @name;

END
GO
