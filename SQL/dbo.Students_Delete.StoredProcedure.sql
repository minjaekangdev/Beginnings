USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Students_Delete]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Students_Delete] 
								@Id int

/*

		SELECT *
		FROM dbo.Students

		DECLARE @Id int = 1

		EXECUTE dbo.Students_Delete @Id

		SELECT *
		FROM dbo.Students



*/

as

BEGIN

			DELETE FROM [dbo].Students
				  WHERE Id = @Id
END


GO
