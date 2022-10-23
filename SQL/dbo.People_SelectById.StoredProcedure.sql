USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[People_SelectById]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[People_SelectById]
		@Id int 
as 

/*
	Declare @Id int = 9 

	Execute dbo.People_SelectById @Id


*/

BEGIN

	SELECT [Id]
      ,[Name]
      ,[Age]
      ,[IsSmoker]
      ,[DateAdded]
      ,[DateModified]
      ,[UserId]
	FROM [dbo].[People]	
	where Id = @Id


END
GO
