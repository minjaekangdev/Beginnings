USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Sabio_Addresses_SelectById]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


Create proc [dbo].[Sabio_Addresses_SelectById]
			@Id int
/*

	declare @Id int = 10
	Execute [dbo].[Sabio_Addresses_SelectById] @Id

*/

as
BEGIN

	SELECT 
	      [Id]
		  ,[LineOne]
		  ,[SuiteNumber]
		  ,[City]
		  ,[State]
		  ,[PostalCode]
		  ,[IsActive]
		  ,[Lat]
		  ,[Long]
	  FROM [dbo].[Sabio_Addresses]
	  Where Id = @Id

END




GO
