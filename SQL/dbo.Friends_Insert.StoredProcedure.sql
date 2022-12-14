USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_Insert]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Friends_Insert]

			@Title nvarchar(50)
			,@Bio nvarchar(50)
			,@Summary nvarchar(50)
			,@Headline nvarchar(50)
			,@Slug nvarchar(50)
			,@StatusId int
			,@PrimaryImageUrl nvarchar(50)
			,@Id int OUTPUT


as 

/*
		Declare @Id int = 0

		Declare @Title nvarchar(50) = 'Title goes here'
				,@Bio nvarchar(50) = 'Bio goes here'
				,@Summary nvarchar(50) = 'Summary here' 
				,@Headline nvarchar(50) = 'Headline goes here'
				,@Slug nvarchar(50) = 'unique slug here' 
				,@StatusId int = 1
				,@PrimaryImageUrl nvarchar(128) = 'https://google.com'
				,@UserId int = 12345

		Execute dbo.Friends_Insert 
									@Title
									,@Bio
									,@Summary
									,@Headline
									,@Slug
									,@StatusId
									,@PrimaryImageUrl
									,@UserId
									,@Id OUTPUT

		Select @Id

		Select *
		From dbo.Friends
		Where Id = @Id


*/

BEGIN
	INSERT INTO [dbo].[Friends]
           ([Title]
           ,[Bio]
           ,[Summary]
           ,[Headline]
           ,[Slug]
           ,[StatusId]
           ,[PrimaryImageUrl])
     VALUES
           (@Title
           ,@Bio
		   ,@Summary
		   ,@Headline
		   ,@Slug
		   ,@StatusId
		   ,@PrimaryImageUrl)

	SET @Id = SCOPE_IDENTITY()
END



GO
