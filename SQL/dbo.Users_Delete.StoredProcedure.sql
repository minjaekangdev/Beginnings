USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Users_Delete]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Users_Delete]

	@Id int

as

/*
	Declare @Id int = 5

	Select *
	From dbo.Users
	WHERE Id = @Id

	Execute dbo.Users_Delete @Id

	Select *
	From dbo.Users
	WHERE Id = @Id


*/

BEGIN

			DELETE FROM [dbo].[Users]
			WHERE Id = @Id

END



GO
