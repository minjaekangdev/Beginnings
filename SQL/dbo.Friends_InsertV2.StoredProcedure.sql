USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_InsertV2]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Friends_InsertV2]
								@Title nvarchar(50)
								,@Bio nvarchar(50)
								,@Summary nvarchar(50)
								,@Headline nvarchar(50)
								,@Slug nvarchar(50)
								,@StatusId int
								,@ImageTypeId int
								,@ImageUrl nvarchar(128)
								,@Id int OUTPUT				


as 

/*
		Declare @Id int

		Declare @Title nvarchar(50) = 'Title goes here'
				,@Bio nvarchar(50) = 'Bio goes here'
				,@Summary nvarchar(50) = 'Summary here' 
				,@Headline nvarchar(50) = 'Headline goes here'
				,@Slug nvarchar(50) = 'unique slug here' 
				,@StatusId int = 1
				,@ImageTypeId int = 1
				,@ImageUrl nvarchar(128) = 'https://google.com'
				,@UserId int = 12345

		Execute dbo.Friends_InsertV2 
									@Title
									,@Bio
									,@Summary
									,@Headline
									,@Slug
									,@StatusId
									,@ImageTypeId
									,@ImageUrl
									,@UserId
									,@Id OUTPUT


		Select *
		FROM [dbo].[FriendsV2]

*/


BEGIN

INSERT INTO [dbo].[Images]
           ([TypeId]
           ,[Url])
     VALUES
           (@ImageTypeId
		   ,@ImageUrl)

	SET @Id = SCOPE_IDENTITY()

INSERT INTO [dbo].[FriendsV2]
           ([Title]
           ,[Bio]
           ,[Summary]
           ,[Headline]
           ,[Slug]
           ,[StatusId]
           ,[PrimaryImageId]
)
     VALUES
           (@Title
			,@Bio
			,@Summary
			,@Headline
			,@Slug
			,@StatusId
			,@Id
)




END

GO
