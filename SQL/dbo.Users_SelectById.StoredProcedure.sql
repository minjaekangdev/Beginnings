USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectById]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Users_SelectById]

		@Id int

as

/*
	Declare @Id int = 5

	Execute dbo.Users_SelectById @Id


*/

BEGIN
	SELECT [Id]
      ,[FirstName]
      ,[LastName]
      ,[Email]
      ,[AvatarUrl]
      ,[TenantId]
      ,[DateCreated]
      ,[DateModified]
  FROM [dbo].[Users]
  where Id=@Id

END




GO
