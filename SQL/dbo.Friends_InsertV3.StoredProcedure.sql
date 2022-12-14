USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_InsertV3]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


--CREATES A NEW IMAGE RECORD THAT CREATES A NEW PRIMARYIMAGEID, THAT CREATES A NEW FRIEND RECORD WITH THAT NEW PRIMARYIMAGE ID,
--THAT TAKES IN A BATCH OF SKILLS, AND PLACES THE SKILLS INTO THE FRIENDSKILLS WITH THE CORRESPONDING FRIENDID THAT WAS CREATED. 
CREATE PROC [dbo].[Friends_InsertV3]
								@Title nvarchar(50)					--PARAMETER
								,@Bio nvarchar(50)					--PARAMETER
								,@Summary nvarchar(50)				--PARAMETER
								,@Headline nvarchar(50)				--PARAMETER
								,@Slug nvarchar(50)					--PARAMETER
								,@StatusId int						--PARAMETER
								,@ImageTypeId int					--PARAMETER
								,@ImageUrl nvarchar(128)			--PARAMETER					
								,@batchSkills sab.Skills READONLY	--MUST BE READ ONLY
											--GENERATED ID OUTPUT
								,@Id int OUTPUT						--GENERATED ID OUTPUT


as 

/*

		--Select *
		--FROM [dbo].[FriendsV2]

		--Select *
		--FROM [dbo].[Images]

		Select *
		FROM [dbo].[FriendSkills]

		Select *
		From [dbo].[Skills]

		Declare @Id int
		Declare @PrimaryImageId int
		Declare @Title nvarchar(50) = 'INSERTv3TEST'
				,@Bio nvarchar(50) = 'Bio INSERTv3TEST here'
				,@Summary nvarchar(50) = 'Summary INSERTv3TEST here' 
				,@Headline nvarchar(50) = 'Headline INSERTv3TEST here'
				,@Slug nvarchar(50) = 'unique slug INSERTv3TEST' 
				,@StatusId int = 1
				,@ImageTypeId int = 1208
				,@ImageUrl nvarchar(128) = 'https://google.com/INSERTv3TEST'
				,@UserId int = 12345
				,@batchSkills sab.Skills
		Insert into @batchSkills (Name) 
		Values ('C++')
		Insert into @batchSkills (Name)
		Values ('Ruby')
		Insert into @batchSkills (Name) 
		Values ('PHP')
		Insert into @batchSkills (Name) 
		Values ('XML3') 

		Execute dbo.Friends_InsertV3 
									@Title
									,@Bio
									,@Summary
									,@Headline
									,@Slug
									,@StatusId
									,@ImageTypeId
									,@ImageUrl
									,@UserId
									,@batchSkills
									,@PrimaryImageId OUTPUT
									,@Id OUTPUT


		--Select *
		--FROM [dbo].[FriendsV2]

		--Select *
		--FROM [dbo].[Images]

		Select *
		FROM [dbo].[FriendSkills]

		Select *
		From [dbo].[Skills]

*/


BEGIN


--POPULATES THE SKILLS TABLE FROM THE BATCH
	--Update dbo.Skills
	--Set Name = b.Name
	--From @batchSkills as b inner join dbo.Skills as ds
	--					on b.Name = ds.Name

INSERT INTO dbo.Skills(Name) 
	Select	n.Name
	From	@batchSkills as n
	Where	Not Exists (Select 1
						From dbo.Skills as s
						where s.Name = n.Name)





--INSERTS ARGUMENTS AND OUTPUTS THE GENERATED PRIMARYIMAGEID
DECLARE @PrimaryImageId int
INSERT INTO [dbo].[Images]
           ([TypeId]
           ,[Url])
     VALUES
           (@ImageTypeId
		   ,@ImageUrl)
	--SCOPE IDENTITY MUST BE SET AFTER THE INSERT. OUTPUTS THE GENERATED ID
	SET @PrimaryImageId = SCOPE_IDENTITY() --THIS IS THE GENERATED ID FOR THE PRIMARYIMAGEID

--INSERTS ARGUMENTS AND VALUE FROM GENERATED PRIMARYIMAGEID AND OUTPUTS THE GENERATED FRIEND ID
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
			,@PrimaryImageId
			)

	--SCOPE IDENTITY MUST BE SET AFTER THE INSERT. OUTPUTS THE GENERATED ID
	SET @Id = SCOPE_IDENTITY() --THIS IS THE ID FOR THE GENERATED FRIENDID 


--INSERTS FRIEND ID FROM THE WHERE STATEMENTS (WHERE FRIENDID === @ID) 
--INSERTS SKILLID FROM WHERE THE BATCHSKILL NAME === SKILL NAME
INSERT INTO dbo.FriendSkills(FriendId, SkillId)
--LOOPS
	SELECT	f.Id
			,s.Id
	FROM	dbo.Skills as s, 
			dbo.FriendsV2 as f
--IF STATEMENT
	Where (Exists (Select 1
						From @batchSkills as b
						where b.Name = s.Name)
		AND f.Id = @Id)


END

--delete from dbo.FriendSkills
--where SkillId > 6

--select *
--from dbo.FriendSkills

--TODO
--UPDATEBYID
GO
