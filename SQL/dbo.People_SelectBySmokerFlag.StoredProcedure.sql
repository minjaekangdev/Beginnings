USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[People_SelectBySmokerFlag]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[People_SelectBySmokerFlag]
		@SmokerFlag bit  
as 

/*
	Declare @SmokerFlag bit = null

	Execute dbo.People_SelectBySmokerFlag @SmokerFlag


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
	where ([IsSmoker] = @SmokerFlag) 
			OR
			(@SmokerFlag IS NULL AND [IsSmoker] IS NULL) 
			


END
GO
