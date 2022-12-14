USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Skills_InsertBatch]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Skills_InsertBatch]
						@batchSkills sab.Skills READONLY
as
/*
		Declare @batchSkills sab.Skills 

		Insert into @batchSkills (Name) 
		Values ('C++')
		Insert into @batchSkills (Name) 
		Values ('Ruby')

		Execute dbo.Skills_InsertBatch @batchSkills

		select *
		from dbo.Skills
*/
BEGIN
		Insert into dbo.Skills (name) 
		Select n.Name
		From @batchSkills as n

END
GO
