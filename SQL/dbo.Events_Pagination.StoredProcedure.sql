USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Events_Pagination]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Events_Pagination] 
								@PageIndex int 
								,@PageSize int

as 

/*
DECLARE @PageIndex int = 0
		,@PageSize int = 10

EXECUTE dbo.Events_Pagination @PageIndex
							,@PageSize



*/

BEGIN
			DECLARE @offset int = @PageIndex * @PageSize


			SELECT e.[Id]
				  ,e.[Name]
				  ,e.[Headline]
				  ,e.[Description]
				  ,e.[Summary]
				  ,e.[Slug]
				  ,Status = (	Select	s.Id
										,s.Name
								From dbo.Statuses as s
								Where s.Id = e.StatusId
								FOR JSON AUTO
				)
				  ,MetaData = (Select	m.dateStart
										,m.dateEnd
										,Location = (Select			l.latitude
																	,l.longitude
																	,l.address
																	,l.zipCode
														From	dbo.Locations as l
														WHERE l.Id = m.locationId
														FOR JSON AUTO
										)
								From	dbo.MetaData as m
								WHERE	m.Id = e.MetaDataId
								FOR JSON AUTO
				  )
				  ,e.[DateCreated]
				  ,e.[DateModified]
				  ,[TotalCount] = COUNT(1) OVER() 
			  FROM [dbo].[Events] as e inner join dbo.MetaData as md
						on e.MetaDataId = md.Id
						inner join dbo.Locations as l 
							on md.locationId = l.Id
			  ORDER BY Id

			  OFFSET @offset ROWS
			  FETCH NEXT @PageSize ROWS ONLY

END

GO
