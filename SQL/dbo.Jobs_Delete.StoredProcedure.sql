USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Jobs_Delete]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Jobs_Delete]
							@Id int

as 

/*



*/

BEGIN

DELETE FROM [dbo].[Jobs]
      WHERE Id = @Id

DELETE FROM dbo.JobImages
		WHERE JobId = @Id

DELETE FROM dbo.JobSkills
		WHERE JobId = @Id

END


GO
