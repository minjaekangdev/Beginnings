USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Skills_InsertBatchV2]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*
Create a UDT for Skills so that you can populate this table with multiple Skills
Use the above UDT in a new stored procedure where you will be writing the code required to insert a new Friend record that will end up in the FriendsV2 table
You should use the original insert proc as a good starting point for this new proc just be sure to name it appropriately.
The proc will end up Inserting into Images Table, Friends Table, Skills and FriendSkills via the Same Stored procedure.
*/
CREATE proc [dbo].[Skills_InsertBatchV2]
						@batchSkills sab.SkillsV2 READONLY
as
/*
		select *
		from dbo.Skills
		
		Declare @batchSkills sab.SkillsV2

		Insert into @batchSkills (Name, Id) 
		Values ('C++', 7)
		Insert into @batchSkills (Name, Id) 
		Values ('Ruby', 8)
		Insert into @batchSkills (Name, Id) 
		Values ('PHP', 9)

		Execute dbo.Skills_InsertBatchV2 @batchSkills

		select *
		from dbo.Skills
*/
BEGIN

		Update dbo.Skills
		Set Name = b.Name
		From @batchSkills as b inner join dbo.Skills as ds
						on b.Id = ds.Id


		
		SET IDENTITY_INSERT dbo.Skills ON

		Insert into dbo.Skills (Name, Id) 
		Select	n.Name
				,n.Id		
		From @batchSkills as n
		Where Not Exists (Select 1
							From dbo.Skills as s
							where s.Id = n.Id)


		SET IDENTITY_INSERT dbo.Skills OFF
END

--select *
--from dbo.Skills

--delete from dbo.Skills
--where id > 6
GO
