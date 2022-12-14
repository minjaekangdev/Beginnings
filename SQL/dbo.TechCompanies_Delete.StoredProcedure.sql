USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[TechCompanies_Delete]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[TechCompanies_Delete] 
									@Id int

as 

/*

SELECT *
FROM dbo.TechCompanies

DECLARE @Id int = 9

EXECUTE dbo.TechCompanies_Delete
								@Id

SELECT *
From dbo.TechCompanies

*/


BEGIN

	DELETE FROM dbo.TechCompanyTags
	WHERE TechCompanyId = @Id

	DELETE FROM dbo.TechCompanyUrls
	WHERE TechCompanyId = @Id

	DELETE FROM dbo.TechCompanyImages
	WHERE TechCompanyId = @Id

	DELETE FROM dbo.FriendTechCompany
	WHERE TechCompany = @Id

	DELETE FROM dbo.TechCompanies
	WHERE Id = @Id
END
GO
