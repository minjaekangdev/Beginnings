USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_DeleteV3]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Friends_DeleteV3]
								@Id int
as


/*
		Select *
		From dbo.FriendsV2

		Select *
		From dbo.FriendSkills

		Declare @Id int = 1688
		EXECUTE dbo.Friends_DeleteV3 @Id

		Select *
		From dbo.FriendsV2

		Select *
		From dbo.FriendSkills

*/

BEGIN

		DELETE FROM		dbo.FriendsV2
				WHERE	Id = @Id
		DELETE FROM		dbo.FriendSkills
				WHERE	FriendId = @Id
		DELETE FROM dbo.FriendTechCompany
				WHERE	FriendId = @Id

END
GO
