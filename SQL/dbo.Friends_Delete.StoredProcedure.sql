USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_Delete]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Friends_Delete]
	@Id int
as 

/*
		Declare @Id int = 3
	

		Select *
		From dbo.Friends
		Where Id = @Id

		Execute dbo.Friends_Delete @Id

		Select *
		From dbo.Friends
		Where Id = @Id
*/


BEGIN

		DELETE FROM [dbo].[Friends]
				WHERE Id = @Id

END
GO
