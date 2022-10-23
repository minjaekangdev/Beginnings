USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[People_SelectAll]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[People_SelectAll]

as 

/*

	Execute dbo.People_SelectAll


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


END
GO
